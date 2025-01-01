import { z } from "zod";
import { zodRequiredString } from "./user";

export const ThreadValidation = z.object({
  thread: zodRequiredString.min(3).max(1000),
  accountId: zodRequiredString,
});

export const CommentValidation = z.object({
  thread: zodRequiredString.min(3).max(1000),
});
