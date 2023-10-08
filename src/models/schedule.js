const pool = require("../config/database");

module.exports = {
  get: (paging, limit) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM schedule_view ORDER BY id LIMIT ?, ?`,
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
        `SELECT COUNT(*) total FROM schedule_table`,
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
        `SELECT * FROM schedule_view WHERE id = ?`,
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
          schedule_table ( DateFrom, DateTo, BusId, Destination, Fee )
        VALUES
          ( ?,?,?,?,? );`,
        [data.dateFrom, data.dateTo, data.busId, data.destination, data.fee],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results);
        },
      );
    }),
  update: (id, data) =>
    new Promise((resolve, reject) => {
      pool.query(
        `UPDATE schedule_table SET
                DateFrom = ?,
                DateTo = ?,
                BusId = ?,
                Destination = ?,
                Fee = ?
            WHERE
                id = ?`,
        [
          data.dateFrom,
          data.dateTo,
          data.busId,
          data.destination,
          data.fee,
          id,
        ],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results);
        },
      );
    }),
};
