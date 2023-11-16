import pool from "../config/database";
import { UsersModel } from "../types/user.types";

const get = (paging: number, size: number): Promise<UsersModel> =>
  new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM user_table ORDER BY CreatedDate DESC LIMIT ?, ?`,
      [paging, size],
      (error, results) => {
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
      (error, results) => {
        if (error) return reject(error);
        return resolve(results[0]);
      },
    );
  });

export { get, getTotal };
