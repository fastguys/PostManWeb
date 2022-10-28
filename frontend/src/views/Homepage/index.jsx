import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';
import TaskTakerPanel from './TaskTakerPanel/index';
import './homepage.css';

const HomePage = () => {
  // controller for switching between task taker and task poster page
  const [isTaskTakerMode, setIsTaskTakerMode] = useState(true);

  if (!localStorage.getItem('authenticated')) {
    return <Navigate to="/" replace={true} />;
  } else {
    return (
      <div>
        <ResponsiveAppBar setIsTaskTakerMode={setIsTaskTakerMode} />
        {isTaskTakerMode ? <TaskTakerPanel /> : <div>Task Poster Panel</div>}
      </div>
    );
  }
};
export default HomePage;
