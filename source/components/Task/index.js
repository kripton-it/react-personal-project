// Core
import React, { PureComponent, createRef } from "react";

// Instruments
import Styles from "./styles.m.css";

// Components
import Checkbox from "../../theme/assets/Checkbox";
import Star from "../../theme/assets/Star";
import Edit from "../../theme/assets/Edit";
import Remove from "../../theme/assets/Remove";

export default class Task extends PureComponent {
    constructor (props) {
        super(props);
        this.state = {
            isTaskEditing: false,
            newMessage:    this.props.message,
        };
        this.taskInput = createRef();
    }

    componentDidUpdate () {
        this.state.isTaskEditing && this.taskInput.current.focus();
    }

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _setTaskEditingState = (isTaskEditing) => {
        this.setState({
            isTaskEditing,
        });
    }

    _removeTask = async () => {
        const { id, _removeTaskAsync } = this.props;

        await _removeTaskAsync(id);
    }

    _toggleTaskCompletedState = async () => {
        const { completed, _updateTaskAsync } = this.props;

        await _updateTaskAsync(this._getTaskShape({ completed: !completed }));
    }

    _toggleTaskFavoriteState = async () => {
        const { favorite, _updateTaskAsync } = this.props;

        await _updateTaskAsync(this._getTaskShape({ favorite: !favorite }));
    }

    _updateTaskMessageOnClick = () => {
        const { isTaskEditing } = this.state;

        if (isTaskEditing) {
            this._cancelUpdatingTaskMessage();

            return null;
        }

        this._setTaskEditingState(true);

        return null;
    }

    _cancelUpdatingTaskMessage () {
        this._setTaskEditingState(false);
        this.setState({
            newMessage: this.props.message,
        });
    }

    _updateNewTaskMessage = ({ target }) => {
        this.setState({
            newMessage: target.value,
        });
    }

    _updateTaskMessageOnKeyDown = async ({ key }) => {
        if (this.state.newMessage === '') {
            return null;
        }

        if (key === 'Enter') {
            await this._updateTask();

            return null;
        }

        if (key === 'Escape') {
            this._cancelUpdatingTaskMessage();

            return null;
        }

        return null;
    }

    _updateTask = async () => {
        this._setTaskEditingState(false);

        if (this.state.newMessage === this.props.message) {
            return null;
        }

        const newTask = this._getTaskShape({ message: this.state.newMessage });

        await this.props._updateTaskAsync(newTask);

        return null;
    }

    render () {
        const {
            task,
            content,
            actions,
            toggleTaskCompletedState,
            toggleTaskFavoriteState,
            updateTaskMessageOnClick,
            removeTask,
        } = Styles;

        const { completed, favorite } = this.props;

        const { isTaskEditing, newMessage } = this.state;

        return (
            <li className = { task }>
                <div className = { content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input
                        disabled = { !isTaskEditing }
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { newMessage }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        checked = { isTaskEditing }
                        className = { updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        onClick = { this._updateTaskMessageOnClick }
                    />
                    <Remove
                        inlineBlock
                        className = { removeTask }
                        color1 = '#3B8EF3'
                        color2 = '#000'
                        height = { 17 }
                        width = { 17 }
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
