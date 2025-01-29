import { AxiosError } from "axios";

import { api } from "@/api";
import { TaskSchema } from "@/types/task";

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

async function AddTask(data: Omit<TaskSchema, "id">) {
    try {
        const res = await api.post("/task", {
            data
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

export { GetTasks, RemoveTask, AddTask };