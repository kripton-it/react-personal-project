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

    console.log("response: ", response);

    const { data } = await response.json();

    //const { data } = response;

    console.log("data: ", data);

    return data;
};

const fetchTasks = async () => {
    const config = {
        headers: {
            Authorization: TOKEN,
        },
    };
    const tasks = await load(config);

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

    const task = await load(config);

    return task;
};

export const api = {
    fetchTasks,
    addNewTask,
};
