// Core
import React, { PureComponent } from "react";

// Instruments
import Styles from "./styles.m.css";

// Components
import Checkbox from "../../theme/assets/Checkbox";
import Star from "../../theme/assets/Star";
import Edit from "../../theme/assets/Edit";
import Remove from "../../theme/assets/Remove";

export default class Task extends PureComponent {
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

    render () {
        const {
            task,
            content,
            actions,
            toggleTaskCompletedState,
            toggleTaskFavoriteState,
            updateTaskMessageOnClick,
        } = Styles;

        const { completed, favorite, message } = this.props.task;

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
                    />
                    <input disabled type = 'text' value = { message } />
                </div>
                <div className = { actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { toggleTaskFavoriteState }
                        color1 = 'var(--paletteColor3)'
                        color2 = 'var(--paletteColor3)'
                        color4 = 'var(--paletteColor10)'
                    />
                    <Edit
                        inlineBlock
                        className = { updateTaskMessageOnClick }
                        color1 = 'var(--paletteColor10)'
                        color2 = 'var(--paletteColor3)'
                    />
                    <Remove
                        inlineBlock
                        className = { toggleTaskCompletedState }
                        color1 = 'var(--paletteColor10)'
                        color2 = 'var(--paletteColor3)'
                    />
                </div>
            </li>
        );
    }
}
