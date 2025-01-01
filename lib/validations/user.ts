import * as z from "zod";

export const zodRequiredString = z.string().nonempty();
export const zodRequiredUrl = z.string().url().nonempty();

export const userValidation = z.object({
  profile_photo: zodRequiredUrl,
  name: zodRequiredString.min(3).max(30),
  username: zodRequiredString.min(3).max(30),
  bio: z.string().max(1000),
});
