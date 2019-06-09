// Core
import React, { Component } from "react";
import { hot } from "react-hot-loader";
import Scheduler from "./../../components/Scheduler";

/*const tasks = [
    {
        id:        1,
        message:   "Задача 1",
        completed: false,
        favorite:  true,
    },
    {
        id:        2,
        message:   "Задача 2",
        completed: true,
        favorite:  true,
    },
    {
        id:        3,
        message:   "Задача 3",
        completed: true,
        favorite:  false,
    }
];*/

@hot(module)
class App extends Component {
    render () {
        return <Scheduler />;
    }
}

export default App;
