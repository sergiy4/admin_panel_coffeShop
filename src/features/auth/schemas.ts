import { z } from 'zod';

export const personSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must contain max 100 characters' }),
  surname: z
    .string()
    .min(1, { message: 'Surname is required' })
    .max(100, { message: 'Surname must contain max 100 characters' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Must be a valid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be atleast 6 characters' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).*$/, {
      message:
        'Password must contain upper and lower case letters, numbers and special characters',
    }),
  city: z
    .string()
    .min(1, { message: 'City is required' })
    .max(100, { message: 'City must contain max 100 characters' }),
  country: z
    .string()
    .min(1, { message: 'Country is required' })
    .max(100, { message: 'Country must contain max 100 characters' }),
  role: z.enum(['ADMIN', 'USER', 'MANAGER']).optional(),
});

export type PersonType = z.infer<typeof personSchema>;