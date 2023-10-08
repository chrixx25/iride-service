const express = require("express");

const router = express.Router();
const { checkToken } = require("../auth/tokenValidation");
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

router.post("/login", loginUser);
router.get("/me", checkToken, getMe);
router.get("/", checkToken, getUsers);
router.post("/", checkToken, createUser);
router.get("/:id", checkToken, getUser, getUserById);
router.put("/:id", checkToken, getUser, updateUser);
router.put("/change-password/:id", checkToken, getUser, updatePassword);

module.exports = router;
