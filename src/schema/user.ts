// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    userName: z.string().min(1, "userName is required"),
    password: z.string().min(1, "password is required"),
  }),
});

export const updateUserSchema = z.object({
  body: z.object({
    userName: z.string().trim().min(1, "userName is required"),
    firstName: z.string().trim().min(1, "firstName is required"),
    lastName: z.string().trim().min(1, "lastName is required"),
    mobileNo: z.string().min(1, "mobileNo is required"),
  }),
});

export const userSchema = z.object({
  body: z.object({
    userName: z.string().trim().min(1, "userName is required"),
    firstName: z.string().trim().min(1, "firstName is required"),
    lastName: z.string().trim().min(1, "lastName is required"),
    mobileNo: z.string().trim().min(1, "mobileNo is required"),
    password: z.string().trim().min(8),
    admin: z.boolean(),
  }),
});

export const passwordSchema = z.object({
  body: z.object({
    password: z.string().trim().min(8),
  }),
});
