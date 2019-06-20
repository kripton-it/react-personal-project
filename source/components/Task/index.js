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
            isEditing: false,
            message:   this.props.message,
        }
    }

    componentDidUpdate () {
        const { isEditing } = this.state;

        if (isEditing) {
            this.editInputRef.current.focus();
            document.addEventListener('keydown', this.handleEscPress);
        } else {
            document.removeEventListener('keydown', this.handleEscPress);
        }
    }

    editInputRef = createRef();

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

    handleRemove = async () => {
        const { id, onRemoveTask } = this.props;

        await onRemoveTask(id);
    }

    handleComplete = async () => {
        const { completed, onUpdateTask } = this.props;

        await onUpdateTask(this._getTaskShape({ completed: !completed }));
    }

    handleFavorite = async () => {
        const { favorite, onUpdateTask } = this.props;

        await onUpdateTask(this._getTaskShape({ favorite: !favorite }));
    }

    handleEdit = async () => {
        const { isEditing, message } = this.state;

        if (!isEditing) {
            this.setState({
                isEditing: true,
            });
        } else if (message) {
            await this.updateMessage();
            this.setState({
                isEditing: false,
            });
        } else {
            this.editInputRef.current.focus();
        }
    }

    handleChange = ({ target }) => {
        this.setState({
            message: target.value,
        });
    }

    updateMessage = async () => {
        const { onUpdateTask } = this.props;
        const { message } = this.state;

        await onUpdateTask(this._getTaskShape({ message }));
    }

    handleEnterPress = async ({ key }) => {
        if (key !== 'Enter' || !this.state.message) {
            return;
        }

        await this.updateMessage();
        this.setState({
            isEditing: false,
        });
    }

    handleEscPress = ({ key }) => {
        if (key !== 'Escape') {
            return;
        }

        this.setState({
            isEditing: false,
            message:   this.props.message,
        });
    }

    render () {
        const {
            task,
            content,
            actions,
            toggleTaskCompletedState,
            toggleTaskFavoriteState,
            updateTaskMessageOnClick,
        } = Styles;

        const { completed, favorite } = this.props;

        const { isEditing, message } = this.state;

        return (
            <li className = { task }>
                <div className = { content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { toggleTaskCompletedState }
                        color1 = 'var(--paletteColor3)'
                        color2 = 'var(--paletteColor2)'
                        color4 = 'var(--paletteColor10)'
                        onClick = { this.handleComplete }
                    />
                    <input
                        disabled = { !isEditing }
                        maxLength = { 50 }
                        ref = { this.editInputRef }
                        type = 'text'
                        value = { message }
                        onChange = { this.handleChange }
                        onKeyPress = { this.handleEnterPress }
                    />
                </div>
                <div className = { actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { toggleTaskFavoriteState }
                        color1 = 'var(--paletteColor3)'
                        color2 = 'var(--paletteColor3)'
                        color4 = 'var(--paletteColor10)'
                        onClick = { this.handleFavorite }
                    />
                    <Edit
                        inlineBlock
                        className = { updateTaskMessageOnClick }
                        color1 = 'var(--paletteColor10)'
                        color2 = 'var(--paletteColor3)'
                        onClick = { this.handleEdit }
                    />
                    <Remove
                        inlineBlock
                        className = { toggleTaskCompletedState }
                        color1 = 'var(--paletteColor10)'
                        color2 = 'var(--paletteColor3)'
                        onClick = { this.handleRemove }
                    />
                </div>
            </li>
        );
    }
}
