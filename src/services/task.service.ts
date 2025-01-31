import { AxiosError } from "axios";

import { api } from "@/api";
import { TaskData } from "@/interfaces/task";

async function GetTasks(userId: string) {
    try {
        const res = await api.get("/tasks", {
            withCredentials: true,
            params: {
                userId: userId
            }
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

async function RemoveTask(taskId: string) {
    try {
        const res = await api.delete(`/task/${taskId}`, {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

async function CreateTask({
    name,
    description,
    categoryId,
    status,
    isImportant
}: TaskData) {
    try {
        const res = await api.post("/task", {
            name,
            description,
            categoryId,
            status,
            isImportant
        }, {
            withCredentials: true
        });

        return res;
    } catch (error) {
        if (error instanceof AxiosError && 'response' in error) {
            return error.response;
        }
    }
}

export { GetTasks, RemoveTask, CreateTask };