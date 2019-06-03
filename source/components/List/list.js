import React from "react";

// Components
import Task from "./../Task";
import { Consumer } from "../../HOC/with-tasks";

const List = () => {
    return (
        <Consumer>
            {(tasks) => {
                return (
                    <ul>
                        {tasks.map((task) => (
                            <Task key = { task.id } task = { task } />
                        ))}
                    </ul>
                );
            }}
        </Consumer>
    );
};

export default List;
