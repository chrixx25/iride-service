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
  checkConflict,
} = require("../controllers/schedule");

router.use(checkToken);
router.get("/", getSchedules);
router.post("/", validate(scheduleSchema), checkConflict, createSchedule);
router.get("/:id", getSchedule, getScheduleById);
router.put("/:id", validate(scheduleSchema), updateSchedule);
router.put("/cancel/:id", validate(cancelSchema), cancelSchedule);

module.exports = router;
