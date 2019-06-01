import React from "react";

// Components
import Task from "./../Task";

const Main = () => {
  return (
    <section>
      <form>
        <input placeholder= 'Описание моей новой задачи' type= 'text' />
        <button type= 'button'>Добавить задачу</button>
      </form>
      <ul>
        <Task />
      </ul>
    </section>
  );
};

export default Main;
