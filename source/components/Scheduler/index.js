// Core
import React, { Component } from "react";
import FlipMove from 'react-flip-move';

// Instruments
import Styles from "./styles.m.css";
import { Provider } from "../../HOC/with-tasks";
import { sortTasksByGroup } from './../../instruments/helpers';
import { api } from "../../REST"; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

// Components
import Spinner from "../Spinner";
import Task from "../Task";
import Checkbox from "../../theme/assets/Checkbox";

export default class Scheduler extends Component {
    state = {
        isTasksFetching: false,
        tasks:           [],
        newTaskMessage:  '',
        tasksFilter:     '',
    };

    componentDidMount () {
        this._fetchTasksAsync();
    }

    _fetchTasksAsync = async () => {
        this._setTasksFetchingState(true);

        this.setState({
            tasks: await api.fetchTasks(),
        });
        this._setTasksFetchingState(false);
    }

    _updateNewTaskMessage = ({ target }) => {
        this.setState({
            newTaskMessage: target.value,
        });
    }

    _createTaskAsync = async (evt) => {
        const { newTaskMessage } = this.state;

        if (!newTaskMessage) {
            return null;
        }

        evt.preventDefault();

        this._setTasksFetchingState(true);

        const newTask = await api.createTask(newTaskMessage);

        this.setState(({ tasks }) => {
            return {
                tasks:          [newTask, ...tasks],
                newTaskMessage: '',
            };
        });
        this._setTasksFetchingState(false);
    }

    _removeTaskAsync = async (id) => {
        this._setTasksFetchingState(true);

        await api.removeTask(id);

        this.setState(({ tasks }) => ({
            tasks: tasks.filter((task) => task.id !== id),
        }));
        this._setTasksFetchingState(false);
    }

    _updateTaskAsync = async (updatedTask) => {
        this._setTasksFetchingState(true);

        const newTask = (await api.updateTask(updatedTask))[0];

        this.setState(({ tasks }) => ({
            tasks: tasks.map((task) => {
                if (newTask.id === task.id) {
                    return newTask;
                }

                return task;
            }),
        }));
        this._setTasksFetchingState(false);
    }

    _completeAllTasksAsync = async () => {
        this._setTasksFetchingState(true);

        const { tasks } = this.state;

        if (this._getAllCompleted()) {
            return null;
        }

        await api.completeAllTasks(tasks);

        this.setState((state) => ({
            isTasksFetching: false,
            tasks:           state.tasks.map((task) => ({
                ...task, completed: true,
            })),
        }));
    }

    _updateTasksFilter = ({ target }) => {
        this.setState({
            tasksFilter: target.value.toLowerCase(),
        });
    }

    _getAllCompleted = () => {
        return this.state.tasks.every(({ completed }) => completed);
    }

    _setTasksFetchingState = (isTasksFetching) => {
        this.setState({
            isTasksFetching,
        });
    }

    render () {
        const { scheduler } = Styles;
        const { tasks, isTasksFetching, newTaskMessage, tasksFilter } = this.state;
        const isAllCompleted = tasks.every((task) => task.completed);

        const tasksList = sortTasksByGroup(tasks.filter(({ message }) => message.indexOf(tasksFilter) >= 0 )).map((task) => (
            <Task
                key = { task.id }
                { ...task }
                _removeTaskAsync = { this._removeTaskAsync }
                _updateTaskAsync = { this._updateTaskAsync }
            />
        ));

        return (
            <Provider value = { sortTasksByGroup(tasks) }>
                <section className = { scheduler }>
                    <Spinner isSpinning = { isTasksFetching } />
                    <main>
                        <header>
                            <h1>Планировщик задач</h1>
                            <input
                                placeholder = 'Поиск'
                                type = 'search'
                                value = { tasksFilter }
                                onChange = { this._updateTasksFilter }
                            />
                        </header>
                        <section>
                            <form onSubmit = { this._createTaskAsync }>
                                <input
                                    className = 'createTask'
                                    maxLength = { 50 }
                                    placeholder = 'Описaние моей новой задачи'
                                    type = 'text'
                                    value = { newTaskMessage }
                                    onChange = { this._updateNewTaskMessage }
                                />
                                <button>Добавить задачу</button>
                            </form>
                            <div className = 'overlay'>
                                <ul>
                                    <FlipMove duration = { 400 } >
                                        { tasksList }
                                    </FlipMove>
                                    {/* <FlipMovePropConverter
                                        delay = { 0 }
                                        disableAllAnimations = { false }
                                        duration = { 400 }
                                        easing = 'ease-in-out'
                                        enterAnimation = 'elevator'
                                        getPosition = { () => {} }
                                        leaveAnimation = 'elevator'
                                        maintainContainerHeight = { false }
                                        staggerDelayBy = { 0 }
                                        staggerDurationBy = { 0 }
                                        typeName = 'div'
                                        verticalAlignment = 'top' >
                                        <div>
                                            { tasksList }
                                        </div>
                                    </FlipMovePropConverter> */}
                                </ul>
                            </div>
                        </section>
                        <footer>
                            <Checkbox
                                // inlineBlock
                                checked = { isAllCompleted }
                                color1 = '#363636'
                                color2 = '#fff'
                                // disabled = { isAllCompleted }
                                onClick = { this._completeAllTasksAsync }
                            />
                            <span className = { Styles.completeAllTasks }>
                                Все задачи выполнены
                            </span>
                        </footer>
                        {/* <Header _updateTasksFilter = { this._updateTasksFilter } tasksFilter = { tasksFilter } /> */}
                        {/* <Main
                            taskMessage = { newTaskMessage }
                            onAddTask = { this._createTaskAsync }
                            onChangeTask = { this._updateNewTaskMessage }
                            onRemoveTask = { this._removeTaskAsync }
                            onUpdateTask = { this._updateTaskAsync }
                        /> */}
                        {/* <Footer onComplete = { this._completeAllTasksAsync } /> */}
                    </main>
                </section>
            </Provider>
        );
    }
}
