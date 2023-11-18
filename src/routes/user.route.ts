import { Router } from "express";

import {
  getUsers,
  getUser,
  loginUser,
  getMe,
  createUser,
  updateUser,
  changePassword,
} from "../controllers/user.controller";
import checkToken from "../middleware/token-validation";
import validate from "../middleware/validate-schema";
import {
  loginSchema,
  updateUserSchema,
  userSchema,
  passwordSchema,
} from "../schema/user";

const router = Router();

router.post("/login", validate(loginSchema), loginUser);

router.use(checkToken);
router.get("/me", getMe);
router.put("/change-password", validate(passwordSchema), changePassword);
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", validate(userSchema), createUser);
router.put("/:id", validate(updateUserSchema), updateUser);

export default router;
