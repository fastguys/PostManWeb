import { TextField, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import LeftMessage from "./leftMessage";
import { useSelector } from "react-redux";
import RightMessage from "./rightMessage";
import apis from "../../apis/user";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
const socket = io.connect("http://localhost:3001", { reconnect: true });
function Chat() {
  const pic = useSelector((state) => state.chat.image);
  const taskId = useLocation();
  const searchParams = new URLSearchParams(taskId.search);
  const [message, setMessage] = useState("message");
  const [allMessages, setAllMessages] = useState([]);
  const [posterId, setPosterId] = useState("");
  useEffect(() => {
    apis.GetTask(searchParams.get("taskId")).then((res) => {
      setPosterId(res[0].posterId);
    });
    console.log(posterId);
  }, [posterId]);
  const handleSend = (message) => {
    const newMessage = {
      msg: message,
      sender: localStorage.getItem("userId"),
      receiver: posterId,
      taskId: searchParams.get("taskId"),
    };
    socket.emit("send_message", newMessage);
    apis.SendMessage(newMessage).then((res) => {
      console.log(res);
    });
    setMessage("");
  };
  socket.emit("join_room", searchParams.get("taskId"));
  useEffect(() => {
    socket.on("history_message", (msg) => {
      setAllMessages(msg);
    });
    socket.on("receive_message", (msg) => {
      setAllMessages([...allMessages, msg]);
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
                image={pic}
                key={message._id}
              />
            );
          } else {
            return (
              <RightMessage
                message={message.msg}
                image={pic}
                key={message._id}
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
