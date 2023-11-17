import pool from "../config/database";
import {
  UsersModel,
  CreateUserReqBody,
  UpdateUserReqBody,
  UpdatePasswordReqBody,
} from "../types/user.types";

const get = (paging: number, size: number): Promise<UsersModel[]> =>
  new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM user_table ORDER BY CreatedDate DESC LIMIT ?, ?`,
      [paging, size],
      (error, results: UsersModel[]) => {
        if (error) return reject(error);
        return resolve(results);
      },
    );
  });

const getTotal = (): Promise<{ total: number }> =>
  new Promise((resolve, reject) => {
    pool.query(
      `SELECT COUNT(*) total FROM user_table`,
      [],
      (error, results: { total: number }[]) => {
        if (error) return reject(error);
        return resolve(results[0]);
      },
    );
  });

const getById = (id: string): Promise<UsersModel> =>
  new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM user_table WHERE id = ?`,
      [id],
      (error, results: UsersModel[]) => {
        if (error) return reject(error);
        return resolve(results[0]);
      },
    );
  });

const getByUserName = (username: string): Promise<UsersModel> =>
  new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM user_table WHERE UserName = ?`,
      [username],
      (error, results: UsersModel[]) => {
        if (error) return reject(error);
        return resolve(results[0]);
      },
    );
  });

const create = (data: CreateUserReqBody) =>
  new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO user_table (
                id,
                Username,
                Password,
                FirstName,
                LastName,
                MobileNo,
                IsAdmin
            ) VALUE (UUID(),?,?,?,?,?,?)`,
      [
        data.userName,
        data.password,
        data.firstName,
        data.lastName,
        data.mobileNo,
        data?.admin ? 1 : 0,
      ],
      (error, results) => {
        if (error) return reject(error);
        return resolve(results);
      },
    );
  });

const update = (id: string, data: UpdateUserReqBody) =>
  new Promise((resolve, reject) => {
    pool.query(
      `UPDATE user_table SET
                UserName = ?,
                FirstName = ?,
                LastName = ?,
                MobileNo = ?
            WHERE
                id = ?`,
      [data.userName, data.firstName, data.lastName, data.mobileNo, id],
      (error, results) => {
        if (error) return reject(error);
        return resolve(results);
      },
    );
  });

const updatePassword = (id: string, data: UpdatePasswordReqBody) =>
  new Promise((resolve, reject) => {
    pool.query(
      `UPDATE user_table SET Password = ? WHERE id = ?`,
      [data.password, id],
      (error, results) => {
        if (error) return reject(error);
        return resolve(results);
      },
    );
  });

export {
  get,
  getTotal,
  getByUserName,
  getById,
  create,
  update,
  updatePassword,
};
