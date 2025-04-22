"use server";

import { cookies } from "next/headers";

import { createCategory, getCategories } from "@/services/category.service";
import { FormState } from "@/lib/definitions";

export async function fetchCategories(userId: string) {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
        return { message: "No token found", error: true };
    }

    return await getCategories(userId, tokenCookie.value)
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

export async function newCategory(state: FormState, formData: FormData): Promise<FormState> {
    const cookieStore = cookies();
    const tokenCookie = (await cookieStore).get("token");

    if (!tokenCookie) {
        return { message: "No token found", errors: { token: "Token is missing" } };
    }

    const validatedFields = state.NewCategoryFormSchema.safeParse({
        name: formData.get("name"),
        color: formData.get("color"),
    });

    if (!validatedFields.success) {
        return {
            errors: {
                name: validatedFields.error.formErrors.fieldErrors.name,
                color: validatedFields.error.formErrors.fieldErrors.color,
            },
        };
    }

    return await createCategory(validatedFields.data, tokenCookie.value)
        .then((res) => {
            if (!res) {
                return { message: "An error occurred", error: true };
            }

            if (!res?.status.toString().startsWith("2")) {
                return { message: res.status + ": " + res.data, error: true };
            }

            return res.data;
        }).catch((error) => {
            return { message: "An error occurred", error: true };
        });
}