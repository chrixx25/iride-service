const express = require("express");

const router = express.Router();
const { checkToken } = require("../auth/tokenValidation");
const { validate } = require("../utils/validate");
const { historySchema } = require("../schema/history");

const {
  createHistory,
  getHistory,
  getHistories,
  updateHistory,
  cancelBooking,
} = require("../controllers/history");

router.get("/", checkToken, getHistories);
router.post("/", checkToken, validate(historySchema), createHistory);
router.get("/:id", checkToken, getHistory, getHistory);
router.put(
  "/:id",
  checkToken,
  validate(historySchema),
  getHistory,
  updateHistory,
);
router.put("/cancel/:id", checkToken, getHistory, cancelBooking);

module.exports = router;
