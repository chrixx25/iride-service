// eslint-disable-next-line import/no-extraneous-dependencies
const { z } = require("zod");

const loginSchema = z.object({
  body: z.object({
    userName: z.string().min(1, "userName is required"),
    password: z.string().min(1, "password is required"),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    userName: z.string().trim().min(1, "userName is required"),
    firstName: z.string().trim().min(1, "firstName is required"),
    lastName: z.string().trim().min(1, "lastName is required"),
    mobileNo: z.string().min(1, "mobileNo is required"),
  }),
});

const userSchema = z.object({
  body: z.object({
    userName: z.string().trim().min(1, "userName is required"),
    firstName: z.string().trim().min(1, "firstName is required"),
    lastName: z.string().trim().min(1, "lastName is required"),
    mobileNo: z.string().trim().min(1, "mobileNo is required"),
    password: z.string().trim().min(8),
    admin: z.boolean(),
  }),
});

const passwordSchema = z.object({
  body: z.object({
    password: z.string().trim().min(8),
  }),
});

module.exports = {
  loginSchema,
  updateUserSchema,
  userSchema,
  passwordSchema,
};
