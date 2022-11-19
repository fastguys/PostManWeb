import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import ResponsiveAppBar from './ResponsiveAppBar';
import TaskTakerPanel from './TaskTakerPanel/index';
import TaskPosterPanel from './TaskPosterPanel/index';
import './homepage.css';

const HomePage = () => {
  // controller for switching between task taker and task poster page
  const [isTaskTakerMode, setIsTaskTakerMode] = useState(true);

  if (!localStorage.getItem('authenticated')) {
    return <Navigate to="/" replace={true} />;
  } else {
    return (
      <div className="homepage">
        <ResponsiveAppBar setIsTaskTakerMode={setIsTaskTakerMode} />
        {isTaskTakerMode ? <TaskTakerPanel /> : <TaskPosterPanel />}
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          Have an issue about the tasks? Report it here!
          <a href="mailto:jiangnanyi111@gmail.com?subject = Feedback&body = Message">
            Send Feedback
          </a>
        </Box>
      </div>
    );
  }
};
export default HomePage;
