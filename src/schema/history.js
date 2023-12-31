// eslint-disable-next-line import/no-extraneous-dependencies
const { z } = require("zod");

const historySchema = z.object({
  body: z.object({
    scheduleId: z.string().min(36).max(36),
  }),
});

module.exports = {
  historySchema,
};
