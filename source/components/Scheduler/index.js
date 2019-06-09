// Core
import React, { Component } from "react";

// Instruments
import Styles from "./styles.m.css";
import { Provider } from "../../HOC/with-tasks";
import { delay, BaseTaskModel } from "../../instruments";
import { api } from "../../REST"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

// Components
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import Spinner from "../Spinner";

export default class Scheduler extends Component {
    constructor () {
        super();
        this._addTask = this._addTask.bind(this);
        this._updateTaskMessage = this._updateTaskMessage.bind(this);
    }

    state = {
        isTasksFetching: false,
        tasks:           [],
        newTaskMessage:  '',
    };

    _updateTaskMessage ({ target }) {
        this.setState({
            newTaskMessage: target.value,
        });
    }

    async _addTask () {
        const { newTaskMessage } = this.state;

        if (!newTaskMessage) {
            return;
        }

        this.setState({
            isTasksFetching: true,
        });

        const newTask = new BaseTaskModel(void 0, false, false, newTaskMessage);

        await delay(2000);

        this.setState(({ tasks }) => {
            return {
                isTasksFetching: false,
                tasks:           [newTask, ...tasks],
                newTaskMessage:  '',
            };
        });
    }

    render () {
        const { scheduler } = Styles;
        const { tasks, isTasksFetching, newTaskMessage } = this.state;

        return (
            <Provider value = { tasks }>
                <section className = { scheduler }>
                    <main>
                        <Spinner isSpinning = { isTasksFetching } />
                        <Header />
                        <Main
                            taskMessage = { newTaskMessage }
                            onAddTask = { this._addTask }
                            onChangeTask = { this._updateTaskMessage }
                        />
                        <Footer />
                    </main>
                </section>
            </Provider>
        );
    }
}
