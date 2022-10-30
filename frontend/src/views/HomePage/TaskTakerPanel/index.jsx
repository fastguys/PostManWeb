import React from 'react';
import { useState, useEffect } from 'react';
import Taskfeed from './Taskfeed/index';
import { Box } from '@mui/material';
import './tasktakerpanel.css';

const TaskTakerPanel = () => {
  const [searchLocationBox, setSearchLocationBox] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const [taskTaken, setTaskTaken] = useState([]);
  // handle the search location box change
  const handleChange = (event) => {
    setSearchLocationBox(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('searchLocationBox', searchLocationBox);
    // set the search location
    setSearchLocation(searchLocationBox);
    setSearchLocationBox('');
  };

  // handle the search location, TODO: need to call google map API later
  useEffect(() => {
    if (searchLocation) {
      console.log('searchLocation', searchLocation);
      // TODO: search the location of the map and show the result˜
    }
    // console.log("searchLocation", searchLocation);
  }, [searchLocation]);

  // this is the mock up task data for the task feed
  // TODO: need to fetch the task data from the backend
  // TODO: need to add the
  const taskList = [
    {
      title: 'task1',
      description: 'task1 description',
      location: '(x, y)',
      isTaken: false,
      taskId: 1,
      senderInfo: '{}',
      receiverInfo: '{}',
      posterId: 'posterId1',
      takerId: 'takerId1',
      timeRemaining: 'timeRemaining1',
      status: 'status1',
      confirmCode: 'confirmCode1'
    },
    {
      title: 'task2',
      description: 'task2 description',
      location: '(x, y)',
      isTaken: false,
      taskId: 1,
      senderInfo: '{}',
      receiverInfo: '{}',
      posterId: 'posterId2',
      takerId: 'takerId2',
      timeRemaining: 'timeRemaining2',
      status: 'status2',
      confirmCode: 'confirmCode2'
    },
    {
      title: 'task3',
      description: 'task3 description',
      location: '(x, y)',
      isTaken: true,
      taskId: 1,
      senderInfo: '{}',
      receiverInfo: '{}',
      posterId: 'posterId3',
      takerId: 'takerId3',
      timeRemaining: 'timeRemaining3',
      status: 'status3',
      confirmCode: 'confirmCode3'
    }
  ];

  // handle the task taken
  useEffect(() => {
    if (taskTaken.length > 0) {
      // TODO: post the taken task to the server
      console.log('taskTaken', taskTaken);
    }
  }, [taskTaken]);
  return (
    <div className="task-taker-panel">
      <div className="task-taker-panel-left">
        <div className="task-taker-title">
          <div>Task Taker Page</div>
        </div>
        <div className="task-taker-search-bar">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={searchLocationBox}
              onChange={handleChange}
              placeholder="Enter address you want to search for task..."
              className="task-taker-search-input"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="task-taker-search-map">
          <div>Map</div>
          <Box className="task-taker-search-map-box" />
        </div>
      </div>
      <div className="task-taker-panel-right">
        <div className="task-field-panel">
          <div className="task-field-title">
            <div>Task Field</div>
          </div>
          <div className="task-field-content">
            <Taskfeed taskList={taskList} setTaskTaken={setTaskTaken} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTakerPanel;
