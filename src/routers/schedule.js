const express = require("express");

const router = express.Router();
const { checkToken } = require("../auth/tokenValidation");

const {
  createSchedule,
  getSchedules,
  getScheduleById,
  updateSchedule,
  getSchedule,
} = require("../controllers/schedule");

router.get("/", checkToken, getSchedules);
router.post("/", checkToken, createSchedule);
router.get("/:id", checkToken, getSchedule, getScheduleById);
router.put("/:id", checkToken, getSchedule, updateSchedule);

module.exports = router;
