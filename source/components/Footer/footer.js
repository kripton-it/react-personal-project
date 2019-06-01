import React from "react";

// Instruments
import Styles from "./styles.m.css";

// Components
import Checkbox from "../../theme/assets/Checkbox";

const Footer = () => {
  return (
    <footer>
      <Checkbox color1= 'var(--paletteColor7)' color2= '#ffffff' inlineBlock />
      <span className= { Styles.completeAllTasks }>Все задачи выполнены</span>
    </footer>
  );
};

export default Footer;
