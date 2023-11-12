const Joi = require("joi");

module.exports = {
  validateHistory: (user) => {
    const schema = Joi.object({
      userId: Joi.string().required().min(36).max(36),
      scheduleId: Joi.string().required().min(36).max(36),
    });
    return schema.validate(user);
  },
};
