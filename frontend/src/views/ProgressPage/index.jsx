import React from 'react';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../TopBar/TopBar';
import { useNavigate, useLocation } from 'react-router-dom';
import apis from '../../apis/user';

const ProgressPage = () => {
  const navigate = useNavigate();
  const route = useLocation();
  const taskId = route.search.split('=')[1];
  const [taskInfo, setTaskInfo] = useState({});

  useEffect(() => {
    if (taskId) {
      // TODO: get task info from backend
      apis.GetTask(taskId).then((res) => {
        console.log(res[0]);
        setTaskInfo(res[0]);
      });
    }
  }, [taskId]);

  const handleFinishTask = () => {
    // check the confirm code match
    if (taskInfo) {
      let confirmationCode = document.getElementById('confirmation_code').value;
      if (confirmationCode === taskInfo.confirmCode) {
        navigate({
          pathname: '/rate-task',
          search: `?taskPoster=${taskInfo.posterId}`
        });
      } else {
        alert('Confirmation code does not match');
      }
    }
  };
  return (
    <div>
      <ResponsiveAppBar />
      <div className="progress-page">
        {taskInfo && (
          <div>
            <div>Task Status: {taskInfo.status}</div>
            <div>Task Poster: {taskInfo.posterId}</div>
            <div>Task Taker: {taskInfo.takerId}</div>
            <div>Task Description: {taskInfo.description}</div>
            <label>Confirmation code (receiver gave you):</label>
            <input type="text" id="confirmation_code" name="confirmation_code" required />
            <button onClick={handleFinishTask}>Finish Task</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressPage;
