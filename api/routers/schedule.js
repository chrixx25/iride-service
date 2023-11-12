const express = require("express");

const router = express.Router();
const { checkToken } = require("../auth/tokenValidation");
const { validate } = require("../utils/validate");
const { scheduleSchema, cancelSchema } = require("../schema/schedule");

const {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  getSchedule,
  cancelSchedule,
} = require("../controllers/schedule");

router.get("/", checkToken, getSchedules);
router.post("/", checkToken, validate(scheduleSchema), createSchedule);
router.get("/:id", checkToken, getSchedule, getScheduleById);
router.put(
  "/:id",
  checkToken,
  validate(scheduleSchema),
  getSchedule,
  updateSchedule,
);
router.put(
  "/cancel/:id",
  checkToken,
  validate(cancelSchema),
  getSchedule,
  cancelSchedule,
);

module.exports = router;
