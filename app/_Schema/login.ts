import {z} from 'zod'


export const loginSchema = z
  .object({
    email: z.string().nonempty("this feild is required").email({ message: "please enter a correct email" }),
    password: z
      .string()
      .nonempty("this feild is required")
      .min(6, { message: "The password must be at least 6 characters long." }),
  });

export type LoginFormData= z.infer<typeof loginSchema>;