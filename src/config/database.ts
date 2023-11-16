/* eslint-disable import/no-extraneous-dependencies */
// import { parseInt } from "lodash";
import { createPool } from "mysql";
import "dotenv/config";

const pool = createPool({
  // port: parseInt(process.env.DB_PORT as string),
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
  typeCast: function castField(field, useDefaultTypeCasting) {
    const bytes = field.buffer();
    // We only want to cast bit fields that have a single-bit in them. If the field
    // has more than one bit, then we cannot assume it is supposed to be a Boolean.
    if (field.type === "BIT" && field.length === 1 && bytes) {
      // A Buffer in Node represents a collection of 8-bit unsigned integers.
      // Therefore, our single "bit field" comes back as the bits '0000 0001',
      // which is equivalent to the number 1.
      return bytes[0] === 1;
    }
    return useDefaultTypeCasting();
  },
});

export default pool;
