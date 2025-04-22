"use server";

import { cookies } from "next/headers";

import { changePassword, getLoggedUser, updateUser } from "@/services/user.service";
import { EditPasswordFormSchema, EditUserFormSchema, FormState } from "@/lib/definitions";

export async function fetchUser() {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
        return { message: "No token found", error: true };
    }

    return await getLoggedUser(tokenCookie?.value)
        .then((res) => {
            if (!res) {
                return { message: "An error occurred", error: true };
            }

            if (!res?.status.toString().startsWith("2")) {
                return { message: res.status + ": " + res.data, error: true };
            }

            const { token, ...user } = res?.data;

            return { token, user };
        })
        .catch((err) => {
            return { message: "An error occurred", error: true };
        });
}

export async function editUser(state: FormState, formData: FormData): Promise<FormState> {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
        return { message: "No token found", errors: { token: "Token is missing" } };
    }

    const validatedFields = EditUserFormSchema.safeParse({
        userId: formData.get("userId"),
        name: formData.get("name"),
        username: formData.get("username"),
        email: formData.get("email")
    });

    if (!validatedFields.success) {
        return {
            errors: {
                userId: validatedFields.error.formErrors.fieldErrors.userId,
                name: validatedFields.error.formErrors.fieldErrors.name,
                username: validatedFields.error.formErrors.fieldErrors.username,
                email: validatedFields.error.formErrors.fieldErrors.email
            }
        };
    }

    const { userId, name, username, email } = validatedFields.data;

    return await updateUser(userId, {
        name,
        username,
        email
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

export async function editPassword(state: FormState, formData: FormData): Promise<FormState> {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
        return { message: "No token found", errors: { token: "Token is missing" } };
    }

    const validatedFields = EditPasswordFormSchema.safeParse({
        userId: formData.get("userId"),
        name: formData.get("name"),
        username: formData.get("username"),
        email: formData.get("email")
    });

    if (!validatedFields.success) {
        return {
            errors: {
                userId: validatedFields.error.formErrors.fieldErrors.userId,
                password: validatedFields.error.formErrors.fieldErrors.password,
                newPassword: validatedFields.error.formErrors.fieldErrors.newPassword
            }
        };
    }

    const { userId, password, newPassword } = validatedFields.data;

    return await changePassword(userId, {
        password,
        newPassword
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