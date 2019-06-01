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

    return (
      <li className ={ task }>
        <div className= { content }>
          <Checkbox
            className ={ toggleTaskCompletedState }
            color1= 'var(--paletteColor3)'
            color2 ='var(--paletteColor2)'
            color4 ='var(--paletteColor10)'
            inlineBlock
          />
          <input type= 'text' value ='Задача 1' disabled />
        </div>
        <div className= { actions }>
          <Star
            inlineBlock
            className ={ toggleTaskFavoriteState }
            color1 ='var(--paletteColor10)'
            color2 ='var(--paletteColor3)'
          />
          <Edit
            inlineBlock
            className= { updateTaskMessageOnClick }
            color1= 'var(--paletteColor10)'
            color2 ='var(--paletteColor3)'
          />
          <Remove
            inlineBlock
            className= { toggleTaskCompletedState }
            color1= 'var(--paletteColor10)'
            color2 ='var(--paletteColor3)'
          />
        </div>
      </li>
    );
  }
}
