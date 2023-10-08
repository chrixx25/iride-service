/* eslint-disable node/no-unpublished-require */
require("dotenv").config();

// eslint-disable-next-line import/no-extraneous-dependencies
const { parseInt } = require("lodash");

const { create, get, getById, getTotal, update } = require("../models/bus");

const { validateBus } = require("../validations/busValidation");

const getBus = async (req, res, next) => {
  let bus;
  try {
    const results = await getById(req.params.id);
    if (!results) return res.status(404).send("Bus Not Found.");

    const { id, Model, PlateNumber, Slot } = results;
    const data = {
      id,
      model: Model,
      plateNumber: PlateNumber,
      slot: Slot,
    };
    bus = data;
    res.bus = bus;
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
  return res.status(500);
};

module.exports = {
  getBuses: async (req, res) => {
    const page = parseInt(req.query?.page || 1);
    const limit = parseInt(req.query?.limit || 10);
    const paging = parseInt(page * limit - limit);

    try {
      const results = await get(paging, limit);
      const resultTotal = await getTotal();
      const { total } = resultTotal;
      const pages = Math.ceil(resultTotal.total / limit);
      const data = results.map(({ id, Model, PlateNumber, Slot }) => ({
        id,
        model: Model,
        plateNumber: PlateNumber,
        slot: Slot,
      }));

      return res.status(200).json({
        results: data,
        page,
        pages,
        size: limit,
        total,
      });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  getBus,
  getBusById: (req, res) => res.status(200).json(res.bus),
  createBus: async (req, res) => {
    const { error } = validateBus(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { body } = req;

    try {
      const results = await create(body);

      if (results) {
        return res.status(201).send(`Bus Sucessfully Created.`);
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
    return res.status(500);
  },
  updateBus: async (req, res) => {
    const { error } = validateBus(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { body } = req;

    try {
      const results = await update(req.params.id, body);

      if (results) {
        return res.status(201).send(`Bus Sucessfully Updated.`);
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
    return res.status(500);
  },
};
