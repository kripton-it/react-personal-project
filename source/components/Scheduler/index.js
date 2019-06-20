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
    state = {
        isFetching: false,
        tasks:           [],
        newTaskMessage:  '',
    };

    componentDidMount () {
        this._fetchTasks();
    }

    _fetchTasks = async () => {
        this.setState({
            isFetching: true,
        });

        const tasks = await api.fetchTasks();

        this.setState({
            isFetching: false,
            tasks,
        });
    }

    _updateTaskMessage = ({ target }) => {
        this.setState({
            newTaskMessage: target.value,
        });
    }

    _addTask = async () => {
        const { newTaskMessage } = this.state;

        if (!newTaskMessage) {
            return;
        }

        this.setState({
            isFetching: true,
        });

        const newTask = await api.addNewTask(newTaskMessage);

        this.setState(({ tasks }) => {
            return {
                isFetching: false,
                tasks:           [newTask, ...tasks],
                newTaskMessage:  '',
            };
        });
    }

    _removeTask = async (id) => {
        this.setState({
            isFetching: true,
        });

        await api.removeTask(id);

        this.setState(({ tasks }) => ({
            isFetching: false,
            tasks:      tasks.filter((task) => task.id !== id),
        }));
    }

    _updateTask = async (updatedTask) => {
        this.setState({
            isFetching: true,
        });

        const newTask = await api.updateTask(updatedTask);

        this.setState(({ tasks }) => ({
            isFetching: false,
            tasks:      tasks.map((task) => {
                if (newTask.id === task.id) {
                    return newTask;
                }

                return task;
            }),
        }));
    }

    render () {
        const { scheduler } = Styles;
        const { tasks, isFetching, newTaskMessage } = this.state;

        return (
            <Provider value = { tasks }>
                <section className = { scheduler }>
                    <main>
                        <Spinner isSpinning = { isFetching } />
                        <Header />
                        <Main
                            taskMessage = { newTaskMessage }
                            onAddTask = { this._addTask }
                            onChangeTask = { this._updateTaskMessage }
                            onRemoveTask = { this._removeTask }
                            onUpdateTask = { this._updateTask }
                        />
                        <Footer />
                    </main>
                </section>
            </Provider>
        );
    }
}
