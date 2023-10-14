/* eslint-disable node/no-unpublished-require */
require("dotenv").config();

// eslint-disable-next-line import/no-extraneous-dependencies
const { parseInt } = require("lodash");
const { sign } = require("jsonwebtoken");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const {
  create,
  get,
  getById,
  getTotal,
  update,
  getByUserName,
  updatePassword,
} = require("../models/user");

const getUser = async (req, res, next) => {
  let user;
  try {
    const results = await getById(req.params.id);
    if (!results) return res.status(404).send("User Not Found.");

    const {
      Id,
      UserName,
      Password,
      FirstName,
      MiddleName,
      LastName,
      Email,
      MobileNo,
    } = results;
    const data = {
      id: Id,
      userName: UserName,
      password: Password,
      firstName: FirstName,
      middleName: MiddleName,
      lastName: LastName,
      email: Email,
      mobileNo: MobileNo,
    };
    user = data;
    res.user = user;
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
  return res.status(500);
};

module.exports = {
  loginUser: async (req, res) => {
    // const { error } = validateLogin(req.body);
    // if (error)
    //   return res.status(400).send({ message: error.details[0].message });

    const { body } = req;

    try {
      const results = await getByUserName(body);

      if (!results)
        return res
          .status(401)
          .json({ message: "Username or Password is incorrect." });

      const isPasswordMatch = compareSync(body.password, results.Password);

      if (isPasswordMatch) {
        const {
          id,
          Username,
          FirstName,
          MiddleName,
          LastName,
          MobileNo,
          IsAdmin,
        } = results;
        const jsontoken = sign(
          {
            result: {
              id,
              userName: Username,
              firstName: FirstName,
              middleName: MiddleName,
              lastName: LastName,
              mobileNo: MobileNo,
              isAdmin: IsAdmin,
            },
          },
          process.env.TOKEN_NAME,
          {
            expiresIn: "2h",
          },
        );
        return res.status(200).json({
          message: "login successfully",
          token: jsontoken,
        });
      }
      return res
        .status(401)
        .json({ message: "Username or Password is incorrect." });
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  getUsers: async (req, res) => {
    const page = parseInt(req.query?.page || 1);
    const limit = parseInt(req.query?.limit || 10);
    const paging = parseInt(page * limit - limit);

    try {
      const results = await get(paging, limit);
      const resultTotal = await getTotal();
      const { total } = resultTotal;
      const pages = Math.ceil(resultTotal.total / limit);
      const data = results.map(
        ({
          id,
          Username,
          Password,
          FirstName,
          MiddleName,
          LastName,
          MobileNo,
          IsAdmin,
        }) => ({
          id,
          username: Username,
          password: Password,
          firstName: FirstName,
          middleName: MiddleName,
          lastName: LastName,
          mobileNo: MobileNo,
          isAdmin: IsAdmin,
        }),
      );

      return res.status(200).json({
        results: data,
        page,
        pages,
        size: limit,
        total,
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  getUserById: (req, res) => res.status(200).json(res.user),
  getMe: (req, res) => res.status(200).json(req.decoded.result),
  getUser,
  createUser: async (req, res) => {
    const { body } = req;

    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    const isUserNameMatch = await getByUserName(body);

    if (isUserNameMatch)
      return res.status(400).send(`${body.userName} username already exists.`);
    try {
      const results = await create(body);

      if (results) {
        return res.status(201).send(`${body.firstName} sucessfully created.`);
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
    return res.status(500);
  },
  updateUser: async (req, res) => {
    // const { error } = validateUpdateUser(req.body);
    // if (error)
    //   return res.status(400).send({ message: error.details[0].message });

    const { body } = req;
    // const decodedToken = req.decoded; // decoded token
    const isUserNameMatch = await getByUserName(body.userName);
    if (isUserNameMatch)
      return res.status(400).send(`${body.userName} username already exists.`);

    try {
      const results = await update(req.params.id, body);
      if (results) {
        return res.status(200).json({
          // eslint-disable-next-line node/no-unsupported-features/es-syntax
          ...res.user,
          // eslint-disable-next-line node/no-unsupported-features/es-syntax
          ...body,
        });
      }
      return res.status(400).send("Failed to update.");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  updatePassword: async (req, res) => {
    const { body } = req;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    try {
      const results = await updatePassword(req.params.id, body);
      if (results) {
        return res.status(200).json(res.user);
      }
      return res.status(400).send("Failed to update.");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
};
