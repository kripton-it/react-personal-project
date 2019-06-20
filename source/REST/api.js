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

    // const { data } = await response.json();

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

const addNewTask = async (text) => {
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

    return tasks[0];
}

export const api = {
    fetchTasks,
    addNewTask,
    removeTask,
    updateTask,
};
