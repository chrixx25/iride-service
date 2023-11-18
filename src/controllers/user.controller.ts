import "dotenv/config";
import type { QueryParams } from "../types/api.types";
import type {
  UserQuery,
  UsersResBody,
  UserResBody,
  LoginResBody,
  LoginReqBody,
  CreateUserReqBody,
  UpdateUserReqBody,
  UpdatePasswordReqBody,
  Decoded,
} from "../types/user.types";

import { genSaltSync, hashSync, compareSync } from "bcrypt";
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { map } from "lodash";
import { MysqlError } from "mysql";

import {
  get,
  getTotal,
  getByUserName,
  getById,
  create,
  update,
  updatePassword,
} from "../models/user.model";

const loginUser = async (
  req: Request<{}, {}, LoginReqBody>,
  res: Response<LoginResBody | string | { message: string }>,
) => {
  const { body } = req;

  try {
    const results = await getByUserName(body.userName);

    if (!results)
      return res
        .status(401)
        .json({ message: "Username or Password is incorrect." });

    const isPasswordMatch = compareSync(body.password, results.Password);

    if (isPasswordMatch) {
      const {
        id,
        Username,
        FirstName,
        MiddleName,
        LastName,
        MobileNo,
        IsAdmin,
      } = results;
      const jsontoken = sign(
        {
          result: {
            id,
            userName: Username,
            firstName: FirstName,
            middleName: MiddleName,
            lastName: LastName,
            mobileNo: MobileNo,
            isAdmin: IsAdmin,
          },
        },
        process.env.TOKEN_NAME as string,
        {
          expiresIn: "2h",
        },
      );
      return res.status(200).json({
        message: "login successfully",
        token: jsontoken,
      });
    }
    return res
      .status(401)
      .json({ message: "Username or Password is incorrect." });
  } catch (err) {
    const error = err as MysqlError;
    console.log(error);
    return res
      .status(500)
      .send({ message: error.message || "Something Wen't Wrong" });
  }
};

const getUsers = async (
  req: Request<{ id: string }, {}, {}, UserQuery>,
  res: Response<UsersResBody | { message: string }>,
) => {
  const page = req.query?.page ?? 1;
  const size = req.query?.size ?? 10;
  const paging = page * size - size;

  try {
    const results = await get(paging, size);
    const resultTotal = await getTotal();
    const { total } = resultTotal;
    const pages = Math.ceil(resultTotal.total / size);
    const data = map(
      results,
      ({
        id,
        Username,
        Password,
        FirstName,
        MiddleName,
        LastName,
        MobileNo,
        IsAdmin,
      }) => ({
        id,
        username: Username,
        password: Password,
        firstName: FirstName,
        middleName: MiddleName,
        lastName: LastName,
        mobileNo: MobileNo,
        isAdmin: IsAdmin,
      }),
    );

    return res.status(200).json({
      results: data,
      page,
      pages,
      size,
      total,
    });
  } catch (err) {
    const error = err as MysqlError;
    return res.status(500).send({ message: error.message });
  }
};

const getUser = async (
  req: Request<QueryParams, {}, {}, UserQuery>,
  res: Response<Omit<UserResBody, "password"> | { message: string }>,
) => {
  try {
    const results = await getById(req.params.id);
    if (!results)
      return res.status(404).send({
        message: "User Not Found.",
      });

    const { id, Username, FirstName, MiddleName, LastName, MobileNo, IsAdmin } =
      results;
    const data = {
      id,
      username: Username,
      firstName: FirstName,
      middleName: MiddleName,
      lastName: LastName,
      mobileNo: MobileNo,
      isAdmin: IsAdmin,
    };
    return res.status(200).json(data);
  } catch (err) {
    const error = err as MysqlError;
    return res.status(500).send({ message: error.message });
  }
};

const getMe = async (
  req: Request<QueryParams> & Decoded,
  res: Response<Omit<UserResBody, "password"> | { message: string }>,
) => {
  if (typeof req?.decoded === "object")
    return res.status(200).json(req?.decoded?.result);
  return res.status(403).send({
    message: "Invalid Token.",
  });
};

const createUser = async (
  req: Request<QueryParams, {}, CreateUserReqBody> & Decoded,
  res: Response<{ message: string }>,
) => {
  const { body } = req;

  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);

  const isUserNameMatch = await getByUserName(body.userName);

  if (isUserNameMatch)
    return res
      .status(400)
      .send({ message: `${body.userName} username already exists.` });
  try {
    const results = await create(body);

    if (results) {
      return res.status(201).send({
        message: `${body.firstName} ${body.lastName} is sucessfully created.`,
      });
    }
  } catch (err) {
    const error = err as MysqlError;
    return res.status(500).send({ message: error.message });
  }
};

const updateUser = async (
  req: Request<QueryParams, {}, UpdateUserReqBody> & Decoded,
  res: Response<{ message: string }>,
) => {
  const { body } = req;

  try {
    const results = await update(req.params.id, body);
    if (results) {
      return res.status(200).send({
        message: `${body.firstName} ${body.lastName} is sucessfully updated.`,
      });
    }
    return res.status(400).send({ message: "Failed to update." });
  } catch (err) {
    const error = err as MysqlError;
    return res.status(500).send({ message: error.message });
  }
};

const changePassword = async (
  req: Request<QueryParams, {}, UpdatePasswordReqBody> & Decoded,
  res: Response<{ message: string }>,
) => {
  const { body } = req;
  const salt = genSaltSync(10);
  body.password = hashSync(body.password, salt);

  if (typeof req?.decoded === "object") {
    const id = req.decoded.result.id;
    try {
      const results = await updatePassword(id, body);
      if (results) {
        return res.status(200).send({
          message: `Password is sucessfully updated.`,
        });
      }
      return res.status(400).send({ message: "Failed to update." });
    } catch (err) {
      const error = err as MysqlError;
      return res.status(500).send({ message: error.message });
    }
  }
  return res.status(500).send({ message: "Invalid Token" });
};

export {
  loginUser,
  getUsers,
  getUser,
  getMe,
  createUser,
  updateUser,
  changePassword,
};
