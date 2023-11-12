const express = require("express");

const router = express.Router();
const { checkToken } = require("../auth/tokenValidation");
const { validate } = require("../utils/validate");
const { busSchema } = require("../schema/bus");
const {
  createBus,
  getBuses,
  getBusById,
  updateBus,
  getBus,
} = require("../controllers/bus");

router.get("/", checkToken, getBuses);
router.post("/", checkToken, validate(busSchema), createBus);
router.get("/:id", checkToken, getBus, getBusById);
router.put("/:id", checkToken, validate(busSchema), getBus, updateBus);

module.exports = router;
