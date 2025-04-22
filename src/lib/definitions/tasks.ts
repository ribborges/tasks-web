import { z } from 'zod';

const NewTaskFormSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Title must be at least 1 character long' })
        .trim(),
    description: z
        .string()
        .optional(),
    dueDate: z
        .string()
        .optional(),
    categoryId: z
        .string()
        .min(1, { message: 'Category is required' })
        .trim()
        .optional(),
    status: z
        .enum(['pending', 'in-progress', 'completed']),
    isImportant: z
        .string()
        .nullable()
        .optional()
});

const UpdateTaskFormSchema = z.object({
    name: z
        .string()
        .optional(),
    description: z
        .string()
        .optional(),
    dueDate: z
        .string()
        .optional(),
    categoryId: z
        .string()
        .optional(),
    status: z
        .enum(['pending', 'in-progress', 'completed'])
        .optional(),
    isImportant: z
        .string()
        .nullable()
        .optional()
});

export { NewTaskFormSchema, UpdateTaskFormSchema };