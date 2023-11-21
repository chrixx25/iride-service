import { z } from "zod";

export const historySchema = z.object({
  body: z.object({
    scheduleId: z.string().min(36).max(36),
  }),
});
