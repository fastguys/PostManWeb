import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ResponsiveAppBar from './ResponsiveAppBar';
import TaskTakerPanel from './TaskTakerPanel/index';
import './homepage.css';

const HomePage = () => {
  // controller for switching between task taker and task poster page
  const [isTaskTakerMode, setIsTaskTakerMode] = useState(true);

  // refresh this page when user enter the page

  if (!localStorage.getItem('authenticated')) {
    return <Navigate to="/" replace={true} />;
  } else {
    console.log('user id is ' + localStorage.getItem('userId'));
    return (
      <div className="homepage">
        <ResponsiveAppBar setIsTaskTakerMode={setIsTaskTakerMode} />
        {isTaskTakerMode ? <TaskTakerPanel /> : <div>Task Poster Panel</div>}
      </div>
    );
  }
};
export default HomePage;
