import { TextField, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import LeftMessage from "./leftMessage";
import RightMessage from "./rightMessage";
import apis from "../../apis/user";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
const socket = io.connect("http://localhost:3001", { reconnect: true });
function Chat() {
  const taskId = useLocation();
  const searchParams = new URLSearchParams(taskId.search);
  console.log(searchParams.get("taskId"));
  console.log(apis.GetTask(searchParams.get("taskId")));
  const [message, setMessage] = useState("message");
  const [allMessages, setAllMessages] = useState([]);
  const [image, setImage] = useState(null);
  let email = localStorage.getItem("userId");
  apis.FinduserByEmail({ email }).then((res) => {
    setImage(res[0].ImageUrl);
  });
  const handleSend = (message) => {
    const newMessage = {
      msg: message,
      sender: localStorage.getItem("userId"),
    };
    socket.emit("send message", newMessage);
    apis.SendMessage(newMessage).then((res) => {
      console.log(res);
    });
    setMessage("");
  };
  useEffect(() => {
    socket.on("receive message", (msg) => {
      setAllMessages([...allMessages, msg]);
    });
    socket.on("history message", (msg) => {
      setAllMessages(msg);
    });
  }, [allMessages]);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          overflowY: "scroll",
          padding: 2,
        }}
      >
        {allMessages.map((message) => {
          if (message.sender === localStorage.getItem("userId")) {
            return (
              <LeftMessage
                message={message.msg}
                image={image}
                key={Date.now() + Math.random() + message.msg}
              />
            );
          } else {
            return (
              <RightMessage
                message={message.msg}
                image={image}
                key={Date.now() + Math.random() + message.msg}
              />
            );
          }
        })}
      </Box>

      <TextField
        placeholder={"Type a message"}
        sx={{}}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSend(message);
          }
        }}
        InputProps={{
          endAdornment: (
            <Button
              onClick={() => {
                handleSend(message);
              }}
              sx={{
                width: 100,
                height: 55,
                mr: -2,
                backgroundColor: "grey",
                whiteSpace: "nowrap",
                display: "block",
                color: "black",
                textTransform: "none",
              }}
            >
              Send
            </Button>
          ),
        }}
      ></TextField>
    </Box>
  );
}

export default Chat;
