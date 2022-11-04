import { TextField, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useRef } from "react";
import LeftMessage from "./leftMessage";
import { useSelector } from "react-redux";
import RightMessage from "./rightMessage";
import apis from "../../apis/user";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOtherUser } from "../../stores/chat";
import { setOtherUserName } from "../../stores/chat";
const socket = io.connect("http://localhost:3001", { reconnect: true });
function Chat() {
  const pic = useSelector((state) => state.chat.image);
  const otherUser = useSelector((state) => state.chat.otherUser);
  const otherUserName = useSelector((state) => state.chat.otherUserName);
  const taskId = useLocation();
  console.log(taskId);
  const searchParams = new URLSearchParams(taskId.search);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [posterId, setPosterId] = useState(otherUserName);
  const bot = useRef(null);
  useEffect(() => {
    if (bot.current) {
      bot.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [allMessages]);
  // useEffect(() => {
  //   apis
  //     .GetTask(searchParams.get("taskId"))
  //     .then((res) => {
  //       setPosterId();
  //       let email = {email: res[0].posterId};
  //       dispatch(setOtherUserName(res[0].posterId));
  //       apis.FinduserByEmail(email).then((res2) => {
  //         dispatch(setOtherUser(res2[0].ImageUrl));
  //       });
  //     })
  //     console.log(otherUserName);
  // }, [posterId]);

  useEffect(() => {
    setPosterId(otherUserName);
    console.log(otherUserName);
  }, [posterId, otherUserName]);

  const handleSend = (message) => {
    const newMessage = {
      msg: message,
      sender: localStorage.getItem("userId"),
      receiver: otherUserName,
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
        {allMessages.map((item, index) => {
          if (
            item.sender === localStorage.getItem("userId") &&
            item.receiver === otherUserName
          ) {
            console.log(otherUserName);
            return <LeftMessage message={item.msg} image={pic} key={index} />;
          } else if (
            item.receiver === localStorage.getItem("userId") &&
            item.sender === otherUserName
          ) {
            return (
              <RightMessage
                message={item.msg}
                image={otherUser}
                email={otherUserName}
                key={index}
              />
            );
          }
        })}
        <div ref={bot}></div>
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
