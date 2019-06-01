import React from "react";

// Components
import Task from "./../Task";

const List = ({tasks}) => {
  return (
    <ul>
      {tasks.map(task => <Task key={task.id} task={task}/>)}
    </ul>
  );
};

export default List;
