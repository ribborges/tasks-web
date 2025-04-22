type FormState =
    | {
        errors?: {
            name?: string[]
            email?: string[]
            username?: string[]
            password?: string[]
        }
        message?: string
    }
    | undefined;

export type { FormState };