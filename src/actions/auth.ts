"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginResponse } from "@/interfaces/auth";
import { loginUser, logoutUser, registerUser } from "@/services/auth.service";
import { LoginFormSchema, FormState, RegisterFormSchema } from "@/lib/definitions";

export async function logout() {
    await logoutUser()
        .then(async (res) => {
            if (!res) {
                return { message: "An error occurred", error: true };
            }

            if (!res?.status.toString().startsWith("2")) {
                return { message: res.status + ": " + res.data, error: true };
            }

            const cookieStore = cookies();
            (await cookieStore).delete("token");

            return { message: "Logout successful" };
        })
        .catch((err) => {
            return { message: "An error occurred", error: true };
        })
        .finally(() => {
            redirect("/auth");
        });
}

export async function login(state: FormState, formData: FormData): Promise<FormState> {
    const cookieStore = cookies();

    const validatedFields = LoginFormSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password")
    });

    if (!validatedFields.success) {
        return {
            errors: {
                username: validatedFields.error.formErrors.fieldErrors.username,
                password: validatedFields.error.formErrors.fieldErrors.password
            }
        };
    }

    const { username, password } = validatedFields.data;

    await loginUser({
        username,
        password
    })
        .then(async (res) => {
            if (!res) {
                return { message: "An error occurred" };
            }

            if (!res?.status.toString().startsWith("2")) {
                return { message: res.status + ": " + res.data };
            }

            const { token, ...user } = res.data as LoginResponse;
            (await cookieStore).set("token", token);

            return { message: "Login successful" };
        })
        .catch((err) => {
            return { message: "An error occurred" };
        })
        .finally(() => {
            redirect("/dashboard");
        });
}

export async function register(state: FormState, formData: FormData): Promise<FormState> {
    const cookieStore = cookies();

    const validatedFields = RegisterFormSchema.safeParse({
        name: formData.get("name"),
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password")
    });

    if (!validatedFields.success) {
        return {
            errors: {
                name: validatedFields.error.formErrors.fieldErrors.name,
                username: validatedFields.error.formErrors.fieldErrors.username,
                email: validatedFields.error.formErrors.fieldErrors.email,
                password: validatedFields.error.formErrors.fieldErrors.password
            }
        };
    }

    const { name, username, email, password } = validatedFields.data;

    await registerUser({
        name,
        username,
        email,
        password
    })
        .then(async (res) => {
            if (!res) {
                return { message: "An error occurred" };
            }

            if (!res?.status.toString().startsWith("2")) {
                return { message: res.status + ": " + res.data };
            }

            const { token, ...user } = res.data as LoginResponse;
            (await cookieStore).set("token", token);

            return { message: "Registration successful" };
        })
        .catch((err) => {
            return { message: "An error occurred" };
        })
        .finally(() => {
            redirect("/dashboard");
        });
}