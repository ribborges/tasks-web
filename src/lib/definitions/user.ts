import { z } from 'zod';

const EditUserFormSchema = z.object({
    userId: z
        .string()
        .min(1, { message: 'User ID is required' })
        .trim(),
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
        .trim()
});

const EditPasswordFormSchema = z.object({
    userId: z
        .string()
        .min(1, { message: 'User ID is required' })
        .trim(),
    password: z
        .string()
        .min(8, { message: 'Current password must be at least 8 characters long' })
        .trim(),
    newPassword: z
        .string()
        .min(8, { message: 'New password must be at least 8 characters long' })
        .trim()
});

export { EditUserFormSchema, EditPasswordFormSchema };