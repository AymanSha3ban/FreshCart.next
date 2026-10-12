import {z} from 'zod'


export const registerSchema = z
  .object({
    name: z.string().min(2, { message: "name must be more than 3 letters" }),
    email: z.string().email({ message: "please enter a correct email" }),
    password: z
      .string()
      .min(6, { message: "The password must be at least 6 characters long." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormData= z.infer<typeof registerSchema>;