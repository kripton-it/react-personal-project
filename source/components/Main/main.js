import React from "react";

// Components
import AddForm from "../AddForm";
import List from "./../List";

const Main = (props) => {
    const { onAddTask, onChangeTask, onRemoveTask, taskMessage } = props;

    return (
        <section>
            <AddForm
                taskMessage = { taskMessage }
                onAddTask = { onAddTask }
                onChange = { onChangeTask }
            />
            <List onRemoveTask = { onRemoveTask } />
        </section>
    );
};

export default Main;
