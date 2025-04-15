import { AxiosError } from "axios";

import { api } from "@/api";
import { TaskData } from "@/interfaces/task";

async function getTasks(userId: string, token: string) {
    try {
        const res = await api.get("/tasks", {
            withCredentials: true,
            params: {
                userId: userId
            },
            headers: {
                cookie: `token=${token}`
            }
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

async function removeTask(taskId: string, token: string) {
    try {
        const res = await api.delete(`/task/${taskId}`, {
            withCredentials: true,
            headers: {
                cookie: `token=${token}`
            }
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

async function createTask(
    {
        name,
        description,
        dueDate,
        categoryId,
        status,
        isImportant
    }: TaskData,
    token: string
) {
    try {
        const res = await api.post("/task", {
            name,
            description,
            dueDate,
            categoryId,
            status,
            isImportant
        }, {
            withCredentials: true,
            headers: {
                cookie: `token=${token}`
            }
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

async function updateTask(
    taskId: string,
    data: {
        name?: string,
        description?: string,
        dueDate?: string,
        categoryId?: string,
        status?: string,
        isImportant?: boolean
    },
    token: string
) {
    try {
        const res = await api.patch(`/task/${taskId}`, data, {
            withCredentials: true,
            headers: {
                cookie: `token=${token}`
            }
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

export { getTasks, removeTask, createTask, updateTask };