import { z } from "zod";

export const busSchema = z.object({
  body: z.object({
    model: z.string().trim().min(1, "model is required"),
    plateNumber: z.string().trim().min(1, "plateNumber is required"),
    slot: z.number().min(1),
  }),
});
