// eslint-disable-next-line import/no-extraneous-dependencies
const { z } = require("zod");

const busSchema = z.object({
  body: z.object({
    model: z.string().min(1, "model is required"),
    plateNumber: z.string().min(1, "plateNumber is required"),
    slot: z.number().min(1),
  }),
});

module.exports = {
  busSchema,
};
