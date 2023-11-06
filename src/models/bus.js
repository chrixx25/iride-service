const pool = require("../config/database");

module.exports = {
  get: (paging, limit) =>
    new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM bus_table ORDER BY CreatedDate DESC LIMIT ?, ?`,
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
        `SELECT COUNT(*) total FROM bus_table`,
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
        `SELECT * FROM bus_table WHERE id = ?`,
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
          bus_table ( Model, PlateNumber, Slot )
        VALUES
          ( ?,?,? )`,
        [data.model, data.plateNumber, data.slot],
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
          bus_table
        SET
          Model = ?,
          PlateNumber = ?,
          Slot = ?
        WHERE
            id = ?`,
        [data.model, data.plateNumber, data.slot, id],
        (error, results, _fields) => {
          if (error) return reject(error);
          return resolve(results);
        },
      );
    }),
};
