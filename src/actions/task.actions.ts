"use server";

import { cookies } from "next/headers";

import { getTasks, createTask, removeTask, updateTask } from "@/services/task.service";
import { FormState } from "@/lib/definitions";
import { NewTaskFormSchema, UpdateTaskFormSchema } from "@/lib/definitions/tasks";

export async function fetchTasks(userId: string) {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
        return { message: "No token found", errors: { token: "Token is missing" } };
    }

    return await getTasks(userId, tokenCookie.value)
        .then((res) => {
            if (!res) {
                return { message: "An error occurred", error: true };
            }

            if (!res?.status.toString().startsWith("2")) {
                return { message: res.status + ": " + res.data, error: true };
            }

            const data = res?.data;

            if (Array.isArray(data)) {
                return data;
            } else {
                return [];
            }
        }).catch((error) => {
            return { message: "An error occurred", error: true };
        });
}

export async function newTask(state: FormState, formData: FormData): Promise<FormState> {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
        return { message: "No token found", errors: { token: "Token is missing" } };
    }

    const validatedFields = NewTaskFormSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        dueDate: formData.get("dueDate"),
        categoryId: formData.get("categoryId"),
        status: formData.get("status"),
        isImportant: formData.get("isImportant")
    });

    console.log(formData);

    if (!validatedFields.success) {
        return {
            errors: {
                name: validatedFields.error.formErrors.fieldErrors.name,
                description: validatedFields.error.formErrors.fieldErrors.description,
                dueDate: validatedFields.error.formErrors.fieldErrors.dueDate,
                categoryId: validatedFields.error.formErrors.fieldErrors.categoryId,
                status: validatedFields.error.formErrors.fieldErrors.status,
                isImportant: validatedFields.error.formErrors.fieldErrors.isImportant
            }
        };
    }

    const { name, description, dueDate, categoryId, status, isImportant } = validatedFields.data;

    return await createTask({
        name,
        description,
        dueDate,
        categoryId,
        status,
        isImportant: isImportant === "on" ? true : false
    }, tokenCookie.value)
        .then((res) => {
            if (!res) {
                return { message: "An error occurred" };
            }

            if (!res?.status.toString().startsWith("2")) {
                return { message: res.status + ": " + res.data };
            }

            return res.data;
        }).catch((error) => {
            return { message: "An error occurred" };
        });
}

export async function deleteTask(taskId: string) {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
        return { message: "No token found", errors: { token: "Token is missing" } };
    }

    return await removeTask(taskId, tokenCookie.value)
        .then((res) => {
            if (!res) {
                return { message: "An error occurred" };
            }

            if (!res?.status.toString().startsWith("2")) {
                return { message: res.status + ": " + res.data };
            }

            return true;
        }).catch((error) => {
            return { message: "An error occurred" };
        });
}

export async function editTask(taskId: string, formData: FormData): Promise<FormState> {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
        return { message: "No token found", errors: { token: "Token is missing" } };
    }

    const validatedFields = UpdateTaskFormSchema.safeParse({
        name: formData.get("name"),
        description: formData.get("description"),
        dueDate: formData.get("dueDate"),
        categoryId: formData.get("categoryId"),
        status: formData.get("status"),
        isImportant: formData.get("isImportant")
    });

    if (!validatedFields.success) {
        return {
            errors: {
                name: validatedFields.error.formErrors.fieldErrors.name,
                description: validatedFields.error.formErrors.fieldErrors.description,
                dueDate: validatedFields.error.formErrors.fieldErrors.dueDate,
                categoryId: validatedFields.error.formErrors.fieldErrors.categoryId,
                status: validatedFields.error.formErrors.fieldErrors.status,
                isImportant: validatedFields.error.formErrors.fieldErrors.isImportant
            }
        };
    }

    const { name, description, dueDate, categoryId, status, isImportant } = validatedFields.data;

    return await updateTask(taskId, {
        name,
        description,
        dueDate,
        categoryId,
        status,
        isImportant: isImportant === "on" ? true : false
    }, tokenCookie.value)
        .then((res) => {
            if (!res) {
                return { message: "An error occurred" };
            }

            if (!res?.status.toString().startsWith("2")) {
                console.log("res", res.data);
                return { message: res.status + ": " + res.data };
            }

            return true;
        }).catch((error) => {
            return { message: "An error occurred" };
        });
}

export async function completeTask(taskId: string) {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
        return { message: "No token found", errors: { token: "Token is missing" } };
    }

    return await updateTask(taskId, {
        status: "completed"
    }, tokenCookie.value)
        .then((res) => {
            if (!res) {
                return { message: "An error occurred" };
            }

            if (!res?.status.toString().startsWith("2")) {
                return { message: res.status + ": " + res.data };
            }

            return true;
        }).catch((error) => {
            return { message: "An error occurred" };
        });
}

export async function setIsImportant(taskId: string, isImportant: boolean) {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
        return { message: "No token found", errors: { token: "Token is missing" } };
    }

    return await updateTask(taskId, {
        isImportant
    }, tokenCookie.value)
        .then((res) => {
            if (!res) {
                return { message: "An error occurred" };
            }

            if (!res?.status.toString().startsWith("2")) {
                return { message: res.status + ": " + res.data };
            }

            return true;
        }).catch((error) => {
            return { message: "An error occurred" };
        });
}