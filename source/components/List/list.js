import React from "react";

// Components
import Task from "./../Task";
import { Consumer } from "../../HOC/with-tasks";

const List = ({ onRemoveTask, onUpdateTask }) => {
    return (
        <Consumer>
            {(tasks) => {
                return (
                    <ul>
                        {tasks.map((task) => (
                            <Task
                                key = { task.id }
                                { ...task }
                                onRemoveTask = { onRemoveTask }
                                onUpdateTask = { onUpdateTask }
                            />
                        ))}
                    </ul>
                );
            }}
        </Consumer>
    );
};

export default List;
