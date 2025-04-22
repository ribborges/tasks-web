import { z } from 'zod';

const LoginFormSchema = z.object({
    username: z
        .string()
        .min(1, { message: 'Username must be at least 1 character long' })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .trim()
});

const RegisterFormSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Name must be at least 2 characters long' })
        .regex(/^[a-zA-Z\s]*$/, { message: 'Name must contain only letters and spaces.' })
        .trim(),
    username: z
        .string()
        .min(1, { message: 'Username must be at least 1 character long' })
        .regex(/^[a-zA-Z0-9_]*$/, { message: 'Username must contain only letters, numbers, and underscores.' })
        .trim(),
    email: z
        .string()
        .min(5, { message: 'Email must be at least 5 character long' })
        .email({ message: 'Invalid email' })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character.' })
});

export { LoginFormSchema, RegisterFormSchema };