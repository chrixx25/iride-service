const express = require("express");

const router = express.Router();
const { checkToken } = require("../auth/tokenValidation");

const {
  createBus,
  getBuses,
  getBusById,
  updateBus,
  getBus,
} = require("../controllers/bus");

router.get("/", checkToken, getBuses);
router.post("/", checkToken, createBus);
router.get("/:id", checkToken, getBus, getBusById);
router.put("/:id", checkToken, getBus, updateBus);

module.exports = router;
