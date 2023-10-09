// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-require
const { map } = require("lodash");

module.exports = {
  validate: (schema) => async (req, res, next) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      return res.status(400).json(
        map(error.issues, ({ path, message }) => ({
          field: path[1],
          message,
        })),
      );
    }
  },
};
