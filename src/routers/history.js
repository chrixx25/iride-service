const express = require("express");

const router = express.Router();
const { checkToken } = require("../auth/tokenValidation");

const {
  createHistory,
  getHistory,
  getHistories,
  updateHistory,
  cancelBooking,
} = require("../controllers/history");

router.get("/", checkToken, getHistories);
router.post("/", checkToken, createHistory);
router.get("/:id", checkToken, getHistory, getHistory);
router.put("/:id", checkToken, getHistory, updateHistory);
router.put("/cancel/:id", checkToken, getHistory, cancelBooking);

module.exports = router;
