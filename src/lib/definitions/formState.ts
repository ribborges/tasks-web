type FormState =
    | {
        errors?: {
            [key: string]: string[] | string | undefined
        }
        message?: string
    }
    | undefined
    | any

export type { FormState };