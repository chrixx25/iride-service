const Joi = require("joi");

module.exports = {
  validateBus: (user) => {
    const schema = Joi.object({
      model: Joi.string().required().max(50),
      plateNumber: Joi.string().required().min(8),
      slot: Joi.number().required(),
    });
    return schema.validate(user);
  },
};
