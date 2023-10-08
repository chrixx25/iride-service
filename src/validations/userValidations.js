const Joi = require("joi");

module.exports = {
  validateUser: (user) => {
    const schema = Joi.object({
      userName: Joi.string().required().max(50),
      password: Joi.string().required().min(8),
      firstName: Joi.string().required().max(50),
      lastName: Joi.string().required().max(50),
      mobileNo: Joi.string().required().min(11),
      admin: Joi.boolean(),
    });
    return schema.validate(user);
  },
  validateUpdateUser: (user) => {
    const schema = Joi.object({
      userName: Joi.string().required().max(50),
      firstName: Joi.string().required().max(50),
      lastName: Joi.string().required().max(50),
      mobileNo: Joi.string().required().min(11),
    });
    return schema.validate(user);
  },
  validateLogin: (user) => {
    const schema = Joi.object({
      userName: Joi.string().required().max(50),
      password: Joi.string().required(),
    });
    return schema.validate(user);
  },
  validatePassword: (user) => {
    const schema = Joi.object({
      password: Joi.string().required().min(8),
    });
    return schema.validate(user);
  },
};
