import { z } from "zod";

export const UserInsertSchema = z.object({
  firstName: z.string().min(3).max(5),
  lastName: z.string().min(3),
  gender: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
  mobile: z.string(),
});
