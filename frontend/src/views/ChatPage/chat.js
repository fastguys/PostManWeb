import { TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import Message from "./message";
import { SendMessage } from "../../apis/user";

function Chat() {
  const [message, setMessage] = useState("message");
  const [allMessages, setAllMessages] = useState([]);

  const handleSend = (message) => {
    SendMessage({ message }).then((res) => {
      console.log(res);
    });
    setAllMessages([...allMessages, message]);
    setMessage("");
  };

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
          justifyContent: "center",
          padding: 2,
        }}
      >
        {allMessages.map((message) => (
          <Message message={message} />
        ))}
      </Box>

      <TextField
        placeholder={"Type a message"}
        sx={{}}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
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
