import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ResponsiveAppBar from '../TopBar/TopBar';
import TaskTakerPanel from './TaskTakerPanel/index';
import './homepage.css';

const HomePage = () => {
  const [isTaskTakerMode, setIsTaskTakerMode] = useState(true);

  if (!localStorage.getItem('authenticated')) {
    return <Navigate to="/" replace={true} />;
  } else {
    return (
      <div>
        <ResponsiveAppBar />
        {isTaskTakerMode ? <TaskTakerPanel /> : <div>Task Poster Panel</div>}
      </div>
    );
  }
};
export default HomePage;
