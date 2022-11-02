import React from 'react';
import { useState, useEffect } from 'react';
import apis from '../../../apis/user';
import { Box } from '@mui/material';
import './taskposterpanel.css'

const TaskPosterPanel = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDscrpt, setTaskDscrpt] = useState('');
  const [senderName, setSenderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [confirmCode, setConfirmCode] = useState('');
  const [senderAddress1, setSenderAddress1] = useState('');
  const [senderAddress2, setSenderAddress2] = useState('');
  const [senderTele, setSenderTele] = useState('');
  const [receiverTele, setReceiverTele] = useState('');
  const [receiverAddress1, setReceiverAddress1] = useState('');
  const [receiverAddress2, setReceiverAddress2] = useState('');
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
    setSenderTele("");
    setReceiverTele("");
  };

  // handle click for submit button, mock up for now
  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName && taskDscrpt && senderName && confirmCode && senderAddress1 && senderAddress2 && receiverAddress1 && receiverAddress2) {
      setValid(true);
    }
    setSubmitted(true);
    console.log('handleSubmit', e);
    var senderCoords = []
    var receiverCoords = []
    senderCoords.push(senderAddress1)
    senderCoords.push(senderAddress2)
    receiverCoords.push(receiverAddress1)
    receiverCoords.push(receiverAddress2)
    const task = {
      title: taskName,
      description: taskDscrpt,
      location: {
        type: 'Point',
        coordinates: senderCoords
      },
      isTaken: false,
      senderInfo: {"name" : senderName, "telephone" : senderTele, "address" : senderCoords},
      receiverInfo: {"name" : receiverName, "telephone" : receiverTele, "address" : receiverCoords},
      posterId: localStorage.getItem('userId'),
      takerId: 'no-taker',
      timeRemaining: '10min',
      status: 'not-taken',
      confirmCode: confirmCode
    };
    console.log('task', task);
    apis
      .PostTask(task)
      .then((res) => {
        console.log('res', res);
      })
      .catch((err) => {
        console.log('err', err);
      });
      if (valid) {
        setSubmitted(false);
        setValid(false);
        reset();
      }
  };

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
    <div className="task-taker-panel">
      <div className="task-taker-panel-left">
        <h2>RECEIVER'S INFO</h2>
        <div className="form-container">
          <form className ="form" onSubmit={handleSubmit}>
            {submitted && valid ? <div className='success-message'>Successfully Posted!</div> : null}
            <input className ="form-field"
              type="text"
              value={taskName}
              placeholder="Please enter a task name."
              onChange={(e) => setTaskName(e.target.value)}
            />
            {submitted && !taskName ? <div className='failed-message'>Error: task name can't be empty</div> : null}
            <input className ="form-field"
              type="text"
              value={taskDscrpt}
              placeholder="Please enter a task description"
              onChange={(e) => setTaskDscrpt(e.target.value)}
            />
            {submitted && !taskDscrpt ? <div className='failed-message'>Error: task description can't be empty</div> : null}            
            <input className ="form-field"
              type="text"
              value={receiverName}
              placeholder="Please enter a receiver's name"
              onChange={(e) => setReceiverName(e.target.value)}
            />
            {submitted && !receiverName ? <div className='failed-message'>Error: sender's name can't be empty</div> : null}
            <input className ="form-field"
              type="integer"
              value={receiverAddress1}
              placeholder="Please enter receiver's address1"
              onChange={(e) => setReceiverAddress1(e.target.value)}
            />
            {submitted && !receiverAddress1 ? <div className='failed-message'>Error: sender's address1 cant be empty</div> : null}
            <input className ="form-field"
              type="integer"
              value={receiverAddress2}
              placeholder="Please enter receiver's address2"
              onChange={(e) => setReceiverAddress2(e.target.value)}
            />
            {submitted && !receiverAddress2 ? <div className='failed-message'>Error: sender's address2 can't be empty</div> : null}
            <input className ="form-field"
              value={confirmCode}
              placeholder="Please enter your confirmation code"
              onChange={(e) => setConfirmCode(e.target.value)}
            />
            {submitted && !confirmCode ? <div className='failed-message'>Error: confirmation code can't be empty!</div> : null}
            <input className ="form-field"
              type="text"
              value={receiverTele}
              placeholder="Please enter receiver's telephone."
              onChange={(e) => setReceiverTele(e.target.value)}
            />
            {submitted && !taskName ? <div className='failed-message'>Error: task name can't be empty</div> : null}
            <button className ="post_button" type="submit" onClick={handleSubmit}>
              Post Task
            </button>
            </form>
          </div>
          <div className="task-taker-search-map">
        </div>

      </div>
      <div className="task-taker-panel-right">
        <div className="task-field-panel">
          <h2>SENDER'S INFO</h2>
          <div>Map</div>
          <div className="task-field-content">
            <Box className="task-poster-search-map-box" />
          </div>
          <div className="form-container">
          <form className ="form" onSubmit={handleSubmit}>
          {submitted && valid ? <div className='success-message'>Successfully Posted!</div> : null}
            <input className ="form-field"
              type="text"
              value={senderName}
              placeholder="Please enter sender's name"
              onChange={(e) => setSenderName(e.target.value)}
            />
            {submitted && !senderName ? <div className='failed-message'>Error: task name can't be empty</div> : null}
            <input className ="form-field"
              type="integer"
              value={senderAddress1}
              placeholder="Please enter sender's address1"
              onChange={(e) => setSenderAddress1(e.target.value)}
            />
            {submitted && !senderAddress1 ? <div className='failed-message'>Error: sender's address1 cant be empty</div> : null}
            <input className ="form-field"
              type="integer"
              value={senderAddress2}
              placeholder="Please enter sender's address2"
              onChange={(e) => setSenderAddress2(e.target.value)}
            />
            {submitted && !senderAddress2 ? <div className='failed-message'>Error: sender's address2 cant be empty</div> : null}
            <input className ="form-field"
              value={senderTele} 
              placeholder="Please enter sender's telephone"
              onChange={(e) => setSenderTele(e.target.value)}
            />
            {submitted && !receiverTele ? <div className='failed-message'>Error: sender's telephone cant be empty</div> : null}
            </form>
          </div>
          <div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default TaskPosterPanel;
