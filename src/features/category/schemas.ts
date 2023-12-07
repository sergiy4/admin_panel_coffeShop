import { z } from 'zod';

export const CategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must contain max 100 characters' }),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;
