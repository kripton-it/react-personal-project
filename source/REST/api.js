import { MAIN_URL, TOKEN } from "./config";

const Method = {
    GET:    `GET`,
    POST:   `POST`,
    PUT:    `PUT`,
    DELETE: `DELETE`,
};

const load = async ({
    url = MAIN_URL,
    method = Method.GET,
    body = null,
    headers,
} = {}) => {
    const response = await fetch(url, { method, body, headers });

    return response;
};

const fetchTasks = async () => {
    const config = {
        headers: {
            Authorization: TOKEN,
        },
    };
    const response = await load(config);

    const { data: tasks } = await response.json();

    return tasks;
};

const createTask = async (text) => {
    const config = {
        method:  Method.POST,
        body:    JSON.stringify({ message: text }),
        headers: {
            Authorization:  TOKEN,
            "Content-Type": "application/json",
        },
    };

    const response = await load(config);

    const { data: task } = await response.json();

    return task;
};

const removeTask = async (id) => {
    const config = {
        url:     `${MAIN_URL}/${id}`,
        method:  Method.DELETE,
        headers: {
            Authorization: TOKEN,
        },
    };

    await load(config);
};

const updateTask = async ({ id, message, completed, favorite }) => {
    const config = {
        body:    JSON.stringify([{ id, message, completed, favorite }]),
        method:  Method.PUT,
        headers: {
            Authorization:  TOKEN,
            "Content-Type": "application/json",
        },
    };

    const response = await load(config);

    const { data: tasks } = await response.json();

    // return tasks[0];
    return tasks;
};

const completeAllTasks = async (tasks) => {
    try {
        await Promise.all(tasks.map((task) => {
            const updatedTask = { ...task, completed: true };

            const taskPromise = updateTask(updatedTask);

            return taskPromise;
        }));

        return;
    } catch (error) {
        throw new Error(error);
    }
}

export const api = {
    fetchTasks,
    createTask,
    removeTask,
    updateTask,
    completeAllTasks,
};
