import { Request, Response } from "express";
import "dotenv/config";

import { get, getTotal } from "../models/user.model";
import { UserParams, UsersResBody } from "../types/user.types";

export const getUsers = async (
  req: Request<{ id: string }, {}, {}, UserParams>,
  res: Response<UsersResBody>,
) => {
  const page = req.query?.page ?? 1;
  const size = req.query?.size ?? 10;
  const paging = page * size - size;

  console.log({
    page,
    size,
    paging,
  });

  try {
    const results = await get(paging, size);
    const resultTotal = await getTotal();
    const { total } = resultTotal;
    const pages = Math.ceil(resultTotal.total / size);

    console.log(results);

    const data = results.map(
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
  } catch (err: any) {
    return res.status(500).send(err);
  }
};
