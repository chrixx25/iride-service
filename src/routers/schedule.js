const express = require("express");

const router = express.Router();
const { checkToken } = require("../auth/tokenValidation");
const { validate } = require("../utils/validate");
const { scheduleSchema } = require("../schema/schedule");

const {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  getSchedule,
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

module.exports = router;
