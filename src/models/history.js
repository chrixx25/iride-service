const pool = require("../config/database");

module.exports = {
  get: (paging, limit, userId) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM history_view${
          userId ? " WHERE UserId = ? " : " "
        }ORDER BY CreatedDate DESC LIMIT ?, ?`,
        [...(userId ? [userId] : []), paging, limit],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results);
        },
      );
    }),
  getTotal: (userId) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT COUNT(*) total FROM history_table${
          userId ? " WHERE UserId = ?" : ""
        }`,
        [...(userId ? [userId] : [])],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results[0]);
        },
      );
    }),
  getById: (id) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM history_view WHERE id = ?`,
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
        `INSERT INTO
          history_table ( id, UserId, ScheduleId )
        VALUES
          ( UUID(), ?, ? );   `,
        [data.userId, data.scheduleId],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results);
        },
      );
    }),
  update: (id, data) =>
    new Promise((resolve, reject) => {
      pool.query(
        `UPDATE
          history_table
        SET
          UserId = ?,
          ScheduleId = ?
        WHERE
            id = ?`,
        [data.userId, data.scheduleId, id],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results);
        },
      );
    }),
  cancel: (id) =>
    new Promise((resolve, reject) => {
      pool.query(
        `UPDATE
          history_table
        SET
          Cancel = 1
        WHERE
            id = ?`,
        [id],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results);
        },
      );
    }),
};
