import React, { Component } from "react";

class AddForm extends Component {
    constructor () {
        super();
        this._submitOnEnter = this._submitOnEnter.bind(this);
        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this._submitNewTask = this._submitNewTask.bind(this);
    }

    _handleFormSubmit (evt) {
        evt.preventDefault();
        this._submitNewTask();
    }

    _submitOnEnter (evt) {
        const isEnterKeyPressed = evt.key === 'Enter';

        if (isEnterKeyPressed) {
            this._submitNewTask(evt);
        }
    }

    _submitNewTask (evt) {
        const { onAddTask } = this.props;

        onAddTask(evt);
    }

    render () {
        const { onChange, taskMessage } = this.props;

        return (
            <form onSubmit = { this._handleFormSubmit }>
                <input
                    maxLength = { 50 }
                    placeholder = 'Описание моей новой задачи '
                    type = 'text'
                    value = { taskMessage }
                    onChange = { onChange }
                    onKeyPress = { this._submitOnEnter }
                />
                <button type = 'submit'>Добавить задачу</button>
            </form>
        );
    }
};

export default AddForm;
