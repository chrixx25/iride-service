const pool = require("../config/database");

module.exports = {
  get: (paging, limit) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM schedule_view ORDER BY CreatedDate DESC LIMIT ?, ?`,
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
          schedule_table ( DateFrom, DateTo, BusId, Destination, Fee, Driver )
        VALUES
          ( ?,?,?,?,?,? );`,
        [
          data.dateFrom,
          data.dateTo,
          data.busId,
          data.destination,
          data.fee,
          data.driver,
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
        `UPDATE schedule_table SET
                DateFrom = ?,
                DateTo = ?,
                BusId = ?,
                Destination = ?,
                Fee = ?,
                Driver = ?
            WHERE
                id = ?`,
        [
          data.dateFrom,
          data.dateTo,
          data.busId,
          data.destination,
          data.fee,
          data.driver,
          id,
        ],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results);
        },
      );
    }),
  cancel: (id, data) =>
    new Promise((resolve, reject) => {
      pool.query(
        `UPDATE
          schedule_table
        SET
          Cancel = ?
        WHERE
            id = ?`,
        [data.cancel ? 1 : 0, id],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results);
        },
      );
    }),
};
