import { z } from "zod";

export const scheduleSchema = z.object({
  body: z.object({
    dateFrom: z.string().trim().min(1, "dateFrom is required"),
    dateTo: z.string().min(1, "dateTo is required"),
    busId: z.string().min(36).max(36),
    destination: z.string().trim().min(1, "destination is required").max(50),
    fee: z.number().min(1),
    driver: z.string().trim().min(1, "driver is required"),
  }),
});

export const cancelSchema = z.object({
  body: z.object({
    cancel: z.boolean(),
  }),
});
