import * as React from 'react';
import List from '@mui/material/List';
import { Box, Paper,Typography} from '@mui/material';
import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TaskIcon from '@mui/icons-material/Task';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));

  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }

const CollapsedTask = (props) => {
  // this is the mock up task data for the task feed
  const task = props.taskInfo;
  const [open, setOpen] = useState(false);

  // controller for the expand button
  const handleopen = (props) => {
    console.log('clicked' +task.status);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
    <Box>
        <React.Fragment>
            <ListItemButton onClick={handleopen}>
                <ListItemIcon >
                    <TaskIcon />
                    </ListItemIcon>
                <ListItemText primary={task.title} />
            </ListItemButton>
        </React.Fragment>
    </Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Posted Task details
        </BootstrapDialogTitle>
        <DialogContent dividers>
            <Typography gutterBottom>
            Task Status: {task.status}
            </Typography>
          <Typography gutterBottom>
            Task Title: {task.title}
          </Typography>
          <Typography gutterBottom>
            Task Description: {task.description}
          </Typography>
          <Typography gutterBottom>
            Task Taken By: {task.takerId}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
export default CollapsedTask;