import React from "react";

// Components
import Task from "./../Task";
import AddForm from "../AddForm";
import List from "./../List";

const Main = (props) => {
  return (
    <section>
      <AddForm />
      <List { ...props } />
    </section>
  );
};

export default Main;
