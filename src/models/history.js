const pool = require("../config/database");

module.exports = {
  get: (paging, limit) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM history_view ORDER BY id LIMIT ?, ?`,
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
        `SELECT COUNT(*) total FROM history_table`,
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
          history_table ( UserId, ScheduleId )
        VALUES
          ( ?, ? );   `,
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
