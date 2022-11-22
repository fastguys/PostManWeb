import React from "react";
import { useState, useEffect } from "react";
import apis from "../../../apis/user";
import { Box } from "@mui/material";
import "./taskposterpanel.css";
import emailjs from "@emailjs/browser";
import Map from "./Map";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const TaskPosterPanel = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDscrpt, setTaskDscrpt] = useState("");
  const [senderName, setSenderName] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [confirmCode, setConfirmCode] = useState("");
  const [senderAddress1, setSenderAddress1] = useState("");
  const [senderAddress2, setSenderAddress2] = useState("");
  const [senderTele, setSenderTele] = useState("");
  const [receiverTele, setReceiverTele] = useState("");
  const [receiverAddress1, setReceiverAddress1] = useState("");
  const [receiverAddress2, setReceiverAddress2] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const reset = () => {
    setTaskName("");
    setTaskDscrpt("");
    setSenderName("");
    setReceiverName("");
    setConfirmCode("");
    setSenderAddress1("");
    setSenderAddress2("");
    setReceiverAddress1("");
    setReceiverAddress2("");
    setSenderTele("");
    setReceiverTele("");
  };
  const report = () => {
    const templateParams = {
      name: "test",
      message: "test",
    };
    emailjs
      .send(
        "service_r6tl7s5",
        "template_58hqzm1",
        templateParams,
        "M258FiSyLuH3P8Pio"
      )
      .then((result) => {
        console.log(result.text);
      });
  };

  // handle click for submit button, mock up for now
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      taskName &&
      taskDscrpt &&
      senderName &&
      confirmCode &&
      senderAddress1 &&
      senderAddress2 &&
      receiverAddress1 &&
      receiverAddress2
    ) {
      setValid(true);
    }
    setSubmitted(true);
    console.log("handleSubmit", e);
    var senderCoords = [];
    var receiverCoords = [];
    senderCoords.push(senderAddress1);
    senderCoords.push(senderAddress2);
    receiverCoords.push(receiverAddress1);
    receiverCoords.push(receiverAddress2);
    const task = {
      title: taskName,
      description: taskDscrpt,
      location: {
        type: "Point",
        coordinates: senderCoords,
      },
      isTaken: false,
      senderInfo: {
        name: senderName,
        telephone: senderTele,
        address: senderCoords,
      },
      receiverInfo: {
        name: receiverName,
        telephone: receiverTele,
        address: receiverCoords,
      },
      posterId: localStorage.getItem("userId"),
      takerId: "no-taker",
      timeRemaining: "10min",
      status: "not-taken",
      confirmCode: confirmCode,
    };
    console.log("task", task);
    apis
      .PostTask(task)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    if (valid) {
      setTimeout(() => {
        setSubmitted(false);
        setValid(false);
        reset();
      }, 1000);
    }
  }, [valid]);

  //   const taskSchema = {
  //     title: '',
  //     description: '',
  //     location: { type: 'Point', coordinates: [1, 1] },
  //     isTaken: false,
  //     senderInfo: {},
  //     receiverInfo: {},
  //     posterId: localStorage.getItem('userId'),
  //     takerId: '',
  //     timeRemaining: '',
  //     status: '',
  //     confirmCode: ''
  //   };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
          mb: 5,
        }}
      >
        <h2>RECEIVER'S INFO</h2>
        <Box
          component="form"
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "lightgrey",
            p: 2,
            borderRadius: 2,
            alignItems: "center",
            '& .MuiTextField-root': { m: 1, width: '40ch' },
          }}
        >
          {submitted && valid ? (
              <div className="success-message">Successfully Posted!</div>
            ) : null}
          <TextField 
            id="outlined-basic" 
            label="Please enter a task name." 
            variant="outlined" 
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          {submitted && !taskName ? (
            <div className="failed-message">
              Error: task name can't be empty
            </div>
          ) : null}
          <TextField 
            id="outlined-basic" 
            label="Please enter a task description." 
            variant="outlined" 
            value={taskDscrpt}
            onChange={(e) => setTaskDscrpt(e.target.value)}
          />
          {submitted && !taskDscrpt ? (
            <div className="failed-message">
              Error: task description can't be empty
            </div>
          ) : null}
          <TextField 
            id="outlined-basic" 
            label="Please enter a receiver's name." 
            variant="outlined" 
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
          {submitted && !receiverName ? (
            <div className="failed-message">
              Error: sender's name can't be empty
            </div>
          ) : null}
          <TextField 
            id="outlined-basic" 
            label="Please enter receiver's address1" 
            variant="outlined" 
            value={receiverAddress1}
            onChange={(e) => setReceiverAddress1(e.target.value)}
          />
          {submitted && !receiverAddress1 ? (
            <div className="failed-message">
              Error: sender's address1 cant be empty
            </div>
          ) : null}
          <TextField 
            id="outlined-basic" 
            label="Please enter receiver's address2" 
            variant="outlined" 
            value={receiverAddress2}
            onChange={(e) => setReceiverAddress2(e.target.value)}
          />
          {submitted && !receiverAddress2 ? (
            <div className="failed-message">
              Error: sender's address2 can't be empty
            </div>
          ) : null}
          <TextField 
            id="outlined-basic" 
            label="Please enter your confirmation code" 
            variant="outlined" 
            value={confirmCode}
            onChange={(e) => setConfirmCode(e.target.value)}
          />
          {submitted && !confirmCode ? (
            <div className="failed-message">
              Error: confirmation code can't be empty!
            </div>
          ) : null}
          <TextField 
            id="outlined-basic" 
            label="Please enter receiver's telephone." 
            variant="outlined" 
            value={receiverTele}
            onChange={(e) => setReceiverTele(e.target.value)}
          />
          {submitted && !receiverTele ? (
            <div className="failed-message">
              Error: receiver's telephone can't be empty
            </div>
          ) : null}
          <Button
            onClick={handleSubmit}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            style={{ background: '#656268' }}>
            Post Task
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <h2>SENDER'S INFO</h2>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "lightgrey",
            p: 5,
            borderRadius: 2,
            alignItems: "center",
            '& .MuiTextField-root': { m: 1, width: '40ch' }
          }}
          
        >
          <Box
            sx={{
              width: 300,
              height: 200,
              border: 1,
              backgroundColor: "white",
            }}
          >
            <Map />
          </Box>
            {submitted && valid ? (
              <div className="success-message">Successfully Posted!</div>
            ) : null}
            <TextField 
              id="outlined-basic" 
              label="Please enter sender's name." 
              variant="outlined" 
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
            />
            {submitted && !senderName ? (
              <div className="failed-message">
                Error: task name can't be empty
              </div>
            ) : null}
            <TextField 
              id="outlined-basic" 
              label="Please enter sender's address1" 
              variant="outlined" 
              type="integer"
              value={senderAddress1}
              onChange={(e) => setSenderAddress1(e.target.value)}
            />
            {submitted && !senderAddress1 ? (
              <div className="failed-message">
                Error: sender's address1 cant be empty
              </div>
            ) : null}
            <TextField 
              id="outlined-basic" 
              label="Please enter sender's address2" 
              variant="outlined" 
              type="integer"
              value={senderAddress2}
              onChange={(e) => setSenderAddress2(e.target.value)}
            />
            {submitted && !senderAddress2 ? (
              <div className="failed-message">
                Error: sender's address2 cant be empty
              </div>
            ) : null}
            <TextField 
              id="outlined-basic" 
              label="Please enter sender's telephone." 
              variant="outlined" 
              value={senderTele}
              onChange={(e) => setSenderTele(e.target.value)}
            />
            {submitted && !receiverTele ? (
              <div className="failed-message">
                Error: sender's telephone cant be empty
              </div>
            ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default TaskPosterPanel;
