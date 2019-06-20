import React from "react";

// Components
import AddForm from "../AddForm";
import List from "./../List";

const Main = (props) => {
    const {
        onAddTask,
        onChangeTask,
        onRemoveTask,
        onUpdateTask,
        taskMessage,
    } = props;

    return (
        <section>
            <AddForm
                taskMessage = { taskMessage }
                onAddTask = { onAddTask }
                onChange = { onChangeTask }
            />
            <List onRemoveTask = { onRemoveTask } onUpdateTask = { onUpdateTask } />
        </section>
    );
};

export default Main;
