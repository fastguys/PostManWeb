import React from 'react';
import apis from '../../../apis/user';
const TaskPosterPanel = () => {
  // handle click for submit button, mock up for now
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit', e);
    const task = {
      title: 'task2',
      description: 'task2 description',
      location: {
        type: 'Point',
        coordinates: [101, 101]
      },
      isTaken: false,
      senderInfo: {},
      receiverInfo: {},
      posterId: localStorage.getItem('userId'),
      takerId: 'no-taker',
      timeRemaining: '10min',
      status: 'not-taken',
      confirmCode: '1234'
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
    <div className="task-poster-panel">
      <div className="task-poster-panel-left">
        <div className="task-poster-title">
          <div>Task Poster Page</div>
        </div>
        <div className="task-poster-search-bar">
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskPosterPanel;
