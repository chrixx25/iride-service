/* eslint-disable node/no-unpublished-require */
require("dotenv").config();

// eslint-disable-next-line import/no-extraneous-dependencies
const { parseInt } = require("lodash");

const {
  create,
  get,
  getById,
  getTotal,
  update,
} = require("../models/schedule");

const { validateSchedule } = require("../validations/scheduleValidation");

const getSchedule = async (req, res, next) => {
  let schedule;
  try {
    const results = await getById(req.params.id);
    if (!results) return res.status(404).send("Schedule Not Found.");

    const {
      id,
      DateFrom,
      DateTo,
      Destination,
      BusId,
      Fee,
      Model,
      PlateNumber,
      Slot,
      RemainingSlots,
    } = results;
    const data = {
      id,
      dateFrom: DateFrom,
      dateTo: DateTo,
      destination: Destination,
      busId: BusId,
      fee: Fee,
      model: Model,
      plateNumber: PlateNumber,
      slot: Slot,
      remainingSlots: RemainingSlots,
    };
    schedule = data;
    res.schedule = schedule;
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
  return res.status(500);
};

module.exports = {
  getSchedules: async (req, res) => {
    const page = parseInt(req.query?.page || 1);
    const limit = parseInt(req.query?.limit || 10);
    const paging = parseInt(page * limit - limit);

    try {
      const results = await get(paging, limit);
      const resultTotal = await getTotal();
      const { total } = resultTotal;
      const pages = Math.ceil(resultTotal.total / limit);
      const data = results.map(
        ({
          id,
          DateFrom,
          DateTo,
          Destination,
          BusId,
          Fee,
          Model,
          PlateNumber,
          Slot,
          RemainingSlots,
        }) => ({
          id,
          dateFrom: DateFrom,
          dateTo: DateTo,
          destination: Destination,
          busId: BusId,
          fee: Fee,
          model: Model,
          plateNumber: PlateNumber,
          slot: Slot,
          remainingSlots: RemainingSlots,
        }),
      );

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
  getSchedule,
  getScheduleById: (req, res) => res.status(200).json(res.user),
  createSchedule: async (req, res) => {
    const { error } = validateSchedule(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { body } = req;

    try {
      const results = await create(body);

      if (results) {
        return res.status(201).send(`Schedule Sucessfully Created.`);
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
    return res.status(500);
  },
  updateSchedule: async (req, res) => {
    const { error } = validateSchedule(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const { body } = req;

    try {
      const results = await update(req.params.id, body);

      if (results) {
        return res.status(201).send(`Schedule Sucessfully Updated.`);
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
    return res.status(500);
  },
};
