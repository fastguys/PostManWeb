import React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TaskIcon from '@mui/icons-material/Task';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DescriptionIcon from '@mui/icons-material/Description';
import { ListItem } from '@mui/material';

const CollapsedTask = (props) => {
    const [open, setOpen] = useState(true);
    const taskInfo = props.taskInfo;

    // controller for the expand button
    const handleCollapseClick = () => {
        setOpen(!open);
    };

    // controller for the task button
    const handleTaskTakeClick = (e) => {
        console.log("task taken");
        props.setTaskTaken((taskTaken) => [...taskTaken, taskInfo]);
    };

    return (
        <>
            <ListItemButton onClick={handleCollapseClick}>
                <ListItemIcon>
                <TaskIcon />
                </ListItemIcon>
                <ListItemText primary={taskInfo.title} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem secondaryAction={
                        <IconButton edge="end" aria-label="take" onClick={handleTaskTakeClick}>
                            <TaskAltIcon />
                        </IconButton>
                    } >
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemIcon>
                                <DescriptionIcon />
                            </ListItemIcon>
                            <ListItemText primary={taskInfo.description} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Collapse>
        </>
    )
}

export default CollapsedTask