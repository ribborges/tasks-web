import { z } from 'zod';

const NewCategoryFormSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Name must be at least 1 character long' })
        .trim(),
    color: z
        .string()
        .min(1, { message: 'Color is required' })
        .trim()
        .regex(/^#[0-9A-F]{6}$/i, { message: 'Invalid color format' })
});

export { NewCategoryFormSchema };