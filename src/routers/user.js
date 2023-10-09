const express = require("express");

const router = express.Router();
const { checkToken } = require("../auth/tokenValidation");
const { validate } = require("../utils/validate");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  getUser,
  loginUser,
  updatePassword,
  getMe,
} = require("../controllers/user");

const {
  loginSchema,
  updateUserSchema,
  userSchema,
  passwordSchema,
} = require("../schema/user");

router.post("/login", validate(loginSchema), loginUser);
router.get("/me", checkToken, getMe);
router.get("/", checkToken, getUsers);
router.post("/", checkToken, validate(updateUserSchema), createUser);
router.get("/:id", checkToken, getUser, getUserById);
router.put("/:id", checkToken, validate(userSchema), getUser, updateUser);
router.put(
  "/change-password/:id",
  checkToken,
  validate(passwordSchema),
  getUser,
  updatePassword,
);

module.exports = router;
