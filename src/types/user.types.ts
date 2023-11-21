import type { Table } from "./api.types";
import type { JwtPayload } from "jsonwebtoken";

import { z } from "zod";

import {
  userSchema,
  loginSchema,
  updateUserSchema,
  passwordSchema,
} from "../schemas/user.schema";

export type UsersModel = {
  id: string;
  Username: string;
  Password: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  MobileNo: string;
  IsAdmin: boolean;
};

export type UserResBody = {
  id: string;
  username: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  mobileNo: string;
  isAdmin: boolean;
};

export type UsersResBody = Table<UserResBody>;

type Me = JwtPayload & { result: Omit<UserResBody, "password"> };

export type Decoded = {
  decoded?: Me | string;
};

export type UserQuery = {
  id?: number;
  page?: number;
  size?: number;
};

export type SuccessRes = {
  message: string;
};

export type LoginResBody = {
  message: string;
  token: string;
};

export type CreateUserReqBody = z.infer<typeof userSchema>["body"];

export type UpdateUserReqBody = z.infer<typeof updateUserSchema>["body"];

export type UpdatePasswordReqBody = z.infer<typeof passwordSchema>["body"];

export type LoginReqBody = z.infer<typeof loginSchema>["body"];
