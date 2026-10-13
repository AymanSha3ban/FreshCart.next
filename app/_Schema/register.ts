import {z} from 'zod'


export const registerSchema = z
  .object({
    name: z.string().nonempty("this feild is required").min(2, { message: "name must be more than 3 letters" }),
    email: z.string().nonempty("this feild is required").email({ message: "please enter a correct email" }),
    password: z
      .string()
      .nonempty("this feild is required")
      .min(6, { message: "The password must be at least 6 characters long." }),
    confirmPassword: z.string().nonempty("this feild is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterFormData= z.infer<typeof registerSchema>;