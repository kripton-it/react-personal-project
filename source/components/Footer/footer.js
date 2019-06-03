import React from "react";

// Instruments
import Styles from "./styles.m.css";

// Components
import Checkbox from "../../theme/assets/Checkbox";
import { Consumer } from "../../HOC/with-tasks";

const Footer = () => {
    return (
        <Consumer>
            {(tasks) => {
                const isChecked = tasks.every((task) => task.completed);

                return (
                    <footer>
                        <Checkbox
                            inlineBlock
                            checked = { isChecked }
                            color1 = 'var(--paletteColor7)'
                            color2 = '#ffffff'
                        />
                        <span className = { Styles.completeAllTasks }>
                            Все задачи выполнены
                        </span>
                    </footer>
                );
            }}
        </Consumer>
    );
};

export default Footer;
