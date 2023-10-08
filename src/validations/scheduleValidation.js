const Joi = require("joi");

module.exports = {
  validateSchedule: (user) => {
    const schema = Joi.object({
      dateFrom: Joi.string().required().max(50),
      dateTo: Joi.string().required().max(50),
      busId: Joi.string().required().max(36),
      destination: Joi.string().required().max(50),
      fee: Joi.number().required(),
    });
    return schema.validate(user);
  },
};
