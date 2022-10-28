import * as React from 'react';
import List from '@mui/material/List';
import CollapsedTask from './CollapsedTask';

export default function NestedList(props) {
  // this is the mock up task data for the task feed
  const taskList = props.taskList;

  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader">
      {taskList.map((task, index) => {
        return <CollapsedTask taskInfo={task} setTaskTaken={props.setTaskTaken} key={index} />;
      })}
    </List>
  );
}