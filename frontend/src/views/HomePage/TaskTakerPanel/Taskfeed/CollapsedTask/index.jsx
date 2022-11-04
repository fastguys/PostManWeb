import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import TaskIcon from '@mui/icons-material/Task';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import ChatIcon from '@mui/icons-material/Chat';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import { ListItem, ListItemSecondaryAction } from '@mui/material';
import apis from '../../../../../apis/user';

const CollapsedTask = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const taskInfo = props.taskInfo;

  // controller for the expand button
  const handleCollapseClick = () => {
    setOpen(!open);
  };

  // controller for the task button
  const handleTaskTakeClick = (e) => {
    // check if the task is taken
    if (taskInfo.isTaken === true) {
      console.log('task is taken');
      return;
    }
    // set the task taken
    taskInfo.isTaken = true;
    taskInfo.takerId = localStorage.getItem('userId');
    taskInfo.status = 'taken';
    // update the status in the database
    apis.UpdateTask(taskInfo._id, taskInfo).then((res) => {
      console.log('res', res);
    });

    props.setTaskTaken((taskTaken) => [...taskTaken, taskInfo]);
    // redirect to task progress page
    console.log(taskInfo);
    navigate({
      pathname: '/task-progress',
      search: `?taskId=${taskInfo._id}`
    });
  };

  // controller for the task chatting button
  const handleTaskChatClick = (e) => {
    // check if the task is taken
    if (taskInfo.isTaken === true) {
      console.log('task is taken');
      return;
    }
    navigate({
      pathname: '/chatpage',
      search: `?taskId=${taskInfo._id}`
    });
    window.location.reload();
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleCollapseClick}>
        <ListItemIcon>
          <TaskIcon />
        </ListItemIcon>
        <ListItemText primary={taskInfo.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary={taskInfo.description} />
          </ListItemButton>
          <ListItemSecondaryAction>
            <IconButton aria-label="chat" onClick={handleTaskChatClick}>
              {taskInfo.isTaken ? <SpeakerNotesOffIcon /> : <ChatIcon />}
            </IconButton>
            <IconButton edge="end" aria-label="take" onClick={handleTaskTakeClick}>
              {taskInfo.isTaken ? <UnpublishedIcon /> : <CheckCircleIcon />}
            </IconButton>
          </ListItemSecondaryAction>
        </List>
      </Collapse>
    </React.Fragment>
  );
};

export default CollapsedTask;
