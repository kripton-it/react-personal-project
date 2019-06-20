import React from "react";

// Components
import Task from "./../Task";
import { Consumer } from "../../HOC/with-tasks";

const List = ({ onRemoveTask }) => {
    return (
        <Consumer>
            {(tasks) => {
                return (
                    <ul>
                        {tasks.map((task) => (
                            <Task key = { task.id } task = { task } onRemoveTask = { onRemoveTask } />
                        ))}
                    </ul>
                );
            }}
        </Consumer>
    );
};

export default List;
