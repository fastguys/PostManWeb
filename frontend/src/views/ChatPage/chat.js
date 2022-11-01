import { TextField, Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import LeftMessage from './leftMessage';
import RightMessage from './rightMessage';
import apis from '../../apis/user';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
const socket = io.connect('http://localhost:3001', { reconnect: true });

const Chat = () =>{
  const pic = useSelector((state) => state.chat.image);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const handleSend = (message) => {
    const newMessage = {
      msg: message,
      sender: localStorage.getItem('userId')
    };
    socket.emit('send message', newMessage);
    apis.SendMessage(newMessage).then((res) => {
      console.log(res);
    });
    setMessage('');
  };
  useEffect(() => {
    socket.on('receive message', (msg) => {
      setAllMessages([...allMessages, msg]);
    });
  }, [allMessages]);
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
      }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 2
        }}>
        {allMessages.map((message) => {
          if (message.sender === localStorage.getItem('userId')) {
            return <LeftMessage message={message.msg} key={message.sender + message.msg} />;
          } else {
            return <RightMessage message={message.msg} key={message.sender + message.msg} />;
          }
        })}
      </Box>

      <TextField
        placeholder={'Type a message'}
        sx={{}}
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
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
                backgroundColor: 'grey',
                whiteSpace: 'nowrap',
                display: 'block',
                color: 'black',
                textTransform: 'none'
              }}>
              Send
            </Button>
          )
        }}></TextField>
    </Box>
  );
}

export default Chat;
