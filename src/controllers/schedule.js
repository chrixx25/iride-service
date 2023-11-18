/* eslint-disable node/no-unpublished-require */
require("dotenv").config();

// eslint-disable-next-line import/no-extraneous-dependencies
const { parseInt, map, uniq } = require("lodash");

const {
  create,
  get,
  getById,
  getTotal,
  update,
  cancel,
  getByDateInterval,
} = require("../models/schedule");

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
      Driver,
      Cancel,
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
      driver: Driver,
      cancel: Cancel,
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
    const { isAdmin } = req.decoded.result;

    try {
      const results = await get(paging, limit, isAdmin);
      const resultTotal = await getTotal(isAdmin);
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
          Driver,
          Cancel,
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
          driver: Driver,
          cancel: Cancel,
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
  getScheduleById: (_req, res) => res.status(200).json(res.schedule),
  checkConflict: async (req, res, next) => {
    const { body } = req;

    try {
      const conflictResult = await getByDateInterval(
        body.dateFrom,
        body.dateTo,
      );
      if (conflictResult && conflictResult.length > 0) {
        const schedules = map(conflictResult, ({ Destination }) => Destination);
        const scheduleList = new Intl.ListFormat("en", {
          style: "long",
          type: "conjunction",
        }).format(uniq(schedules));

        return res.status(400).json({
          message: `It has a conflict date with ${scheduleList} schedule${
            schedules.length > 1 ? "s" : ""
          }.`,
        });
      }
      return next();
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },
  createSchedule: async (req, res) => {
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
  cancelSchedule: async (req, res) => {
    const { body } = req;

    try {
      const results = await cancel(req.params.id, body);

      if (results) {
        return res
          .status(201)
          .send(
            `Schedule is ${body.cancel ? "Cancelled" : "Reopened"} Succesfully`,
          );
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
    return res.status(500);
  },
};
