import React from 'react';
import { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import ResponsiveAppBar from '../TopBar/TopBar';
import { useNavigate, useLocation } from 'react-router-dom';
import apis from '../../apis/user';
import './ProgressPage.css';

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
        <div className="progress-page-title">Task Progress</div>
        <div className="progress-page-content">
          <div className="progress-page-left-content">
            <Box
              sx={{
                width: 500,
                height: 300,
                backgroundColor: 'white',
                border: '1px dashed grey'
              }}
            />
          </div>
          <div className="progress-page-right-content">
            {taskInfo && taskInfo.location && taskInfo.senderInfo && taskInfo.receiverInfo && (
              <div>
                <div className="progress-page-data">Task Status: {taskInfo.status}</div>
                <div className="progress-page-data">Task Poster: {taskInfo.posterId}</div>
                <div className="progress-page-data">Task Taker: {taskInfo.takerId}</div>
                <div className="progress-page-data">Task Description: {taskInfo.description}</div>
                <div className="progress-page-data">
                  Task Location Coordinates: {taskInfo.location.coordinates}
                </div>
                <div className="progress-page-data">
                  Task Sender Name: {taskInfo.senderInfo.name}
                </div>
                <div className="progress-page-data">
                  Task Sender Phone: {taskInfo.senderInfo.telephone}
                </div>
                <div className="progress-page-data">
                  Task Sender Address: {taskInfo.senderInfo.address}
                </div>
                <div className="progress-page-data">
                  Task Receiver Name: {taskInfo.receiverInfo.name}
                </div>
                <div className="progress-page-data">
                  Task Receiver Phone: {taskInfo.receiverInfo.telephone}
                </div>
                <div className="progress-page-data">
                  Task Receiver Address: {taskInfo.receiverInfo.address}
                </div>

                <div className="progress-page-data">
                  <label>Confirmation code (receiver gave you):</label>
                  <input type="text" id="confirmation_code" name="confirmation_code" required />
                  <button onClick={handleFinishTask}>Finish Task</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
