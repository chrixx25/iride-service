const pool = require("../config/database");

module.exports = {
  get: (paging, limit) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM user_table ORDER BY id LIMIT ?, ?`,
        [paging, limit],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results);
        },
      );
    }),
  getTotal: () =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT COUNT(*) total FROM user_table`,
        [],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results[0]);
        },
      );
    }),
  getById: (id) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM user_table WHERE id = ?`,
        [id],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results[0]);
        },
      );
    }),
  create: (data) =>
    new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO user_table (
                Username,
                Password,
                FirstName,
                LastName,
                MobileNo,
                IsAdmin
            ) VALUE (?,?,?,?,?,?)`,
        [
          data.userName,
          data.password,
          data.firstName,
          data.lastName,
          data.mobileNo,
          data?.admin ? 1 : 0,
        ],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results);
        },
      );
    }),
  update: (id, data) =>
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
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results);
        },
      );
    }),
  getByUserName: (data) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM user_table WHERE UserName = ?`,
        [data.userName],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results[0]);
        },
      );
    }),
  updatePassword: (id, data) =>
    new Promise((resolve, reject) => {
      pool.query(
        `UPDATE user_table SET Password = ? WHERE id = ?`,
        [data.password, id],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results);
        },
      );
    }),
};
