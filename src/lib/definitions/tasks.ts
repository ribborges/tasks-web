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
        .trim(),
    status: z
        .enum(['pending', 'in-progress', 'completed']),
    isImportant: z
        .string()
        .nullable()
        .optional()
});

export { NewTaskFormSchema };