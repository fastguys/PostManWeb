import * as React from 'react';
import List from '@mui/material/List';
import { Box, Paper,Typography} from '@mui/material';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import TaskIcon from '@mui/icons-material/Task';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
export default function NestedList(props) {
  // this is the mock up task data for the task feed
  const taskList = props.taskList;
  const [open, setOpen] = useState(false);

  // controller for the expand button
  const handleCollapseClick = () => {
    console.log('clicked');
  };
  return (
    <Box>
        <List
            sx={{width: '100%', bgcolor: 'background.paper' }} 
            component="nav"
            aria-labelledby="nested-list-subheader">
            {taskList.map((task,index) => {
                if (task.posterId === localStorage.getItem('userId')) {
                    return (
                    <React.Fragment>
                    <ListItemButton onClick={handleCollapseClick}>
                      <ListItemIcon >
                        <TaskIcon />
                      </ListItemIcon>
                      <ListItemText primary={task.title} />
                    </ListItemButton>
                  </React.Fragment>)
                }
            })}
        </List>
    </Box>
  );
}