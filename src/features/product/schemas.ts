import { z } from 'zod';

export const ProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must contain max 100 characters' }),

  category: z.object({
    value: z.string(),
  }),
  price: z
    .number()
    .positive({ message: 'Price must be positive' })
    .lte(100_000_000)
    .int({ message: 'Price must be integer' })
    .safe(),
  images: z
    .instanceof(FileList)
    .refine((val) => val.length > 0, 'File is required'),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .max(500, { message: 'Name must contain max 100 characters' }),
  availableQuantity: z.number().positive().lte(10_000).int().safe(),
});

export type ProductSchemaType = z.infer<typeof ProductSchema>;
