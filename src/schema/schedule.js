// eslint-disable-next-line import/no-extraneous-dependencies
const { z } = require("zod");

const scheduleSchema = z.object({
  body: z.object({
    dateFrom: z.string().min(1, "dateFrom is required"),
    dateTo: z.string().min(1, "dateTo is required"),
    busId: z.string().min(36).max(36),
    destination: z.string().min(1, "destination is required").max(50),
    fee: z.number().min(1),
  }),
});

module.exports = {
  scheduleSchema,
};
