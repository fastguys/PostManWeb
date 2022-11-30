import * as React from "react";
import List from "@mui/material/List";
import { Box, Paper, Typography } from "@mui/material";
import { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TaskIcon from "@mui/icons-material/Task";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
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
            position: "absolute",
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
  const [inneropen, setInnerOpen] = useState(false);
  const handlerateopen = (props) => {
    setInnerOpen(true);
  };
  // controller for the expand button
  const handleopen = (props) => {
    console.log("clicked" + task.status);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlerateClose = () => {
    setInnerOpen(false);
  };
  const defaultStyling = {
    border: "1px solid gray",
    backgroundColor: "rgba(20,20,20,0.4)",
    width: 300,
    height: 100,
  };
  return (
    <div>
      <Box>
        <React.Fragment>
          <ListItemButton onClick={handleopen}>
            <ListItemIcon>
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
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Posted Task details
        </BootstrapDialogTitle>
        <DialogContent dividers>
          {task.status === "completed" ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography gutterBottom> Image Prove:</Typography>
              <img
                alt="Provence"
                src={task.ImageUrl}
                style={{
                  width: 200,
                  height: 200,
                }}
              ></img>
            </Box>
          ) : null}
          <Typography gutterBottom>Task Status: {task.status}</Typography>
          <Typography gutterBottom>Task Title: {task.title}</Typography>
          <Typography gutterBottom>
            Task Description: {task.description}
          </Typography>
          <Typography gutterBottom>Task Taken By: {task.takerId}</Typography>
        </DialogContent>
        <DialogActions>
          {task.status === "completed" ? (
            <Button autoFocus onClick={handlerateopen}>
              Rate Task taker
            </Button>
          ) : null}
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button autoFocus onClick={handleRateTaskPoster}>
            Feedback
          </Button>
        </DialogActions>
        <BootstrapDialog
          onClose={handlerateClose}
          aria-labelledby="customized-dialog-title"
          open={inneropen}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handlerateClose}
          >
            Rate the task taker
          </BootstrapDialogTitle>
        </BootstrapDialog>
      </BootstrapDialog>
    </div>
  );
};
export default CollapsedTask;
