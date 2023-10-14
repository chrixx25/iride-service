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
  cancel,
} = require("../models/history");

const getHistory = async (req, res, next) => {
  let history;
  try {
    const results = await getById(req.params.id);
    if (!results) return res.status(404).send("History Not Found.");

    const {
      id,
      UserId,
      ScheduleId,
      Cancel,
      DateFrom,
      Destination,
      Fee,
      Model,
    } = results;
    const data = {
      id,
      userId: UserId,
      scheduleId: ScheduleId,
      cancel: Cancel,
      datefrom: DateFrom,
      destination: Destination,
      fee: Fee,
      model: Model,
    };
    history = data;
    res.history = history;
    next();
  } catch (err) {
    return res.status(500).json(err);
  }
  return res.status(500);
};

module.exports = {
  getHistories: async (req, res) => {
    const page = parseInt(req.query?.page || 1);
    const limit = parseInt(req.query?.limit || 10);
    const paging = parseInt(page * limit - limit);
    const userId = req.decoded.result.isAdmin ? "" : req.decoded.result.id;

    try {
      const results = await get(paging, limit, userId);
      const resultTotal = await getTotal(userId);
      const { total } = resultTotal;
      const pages = Math.ceil(resultTotal.total / limit);
      const data = results.map(
        ({
          id,
          UserId,
          ScheduleId,
          Cancel,
          DateFrom,
          Destination,
          Fee,
          Model,
        }) => ({
          id,
          userId: UserId,
          scheduleId: ScheduleId,
          cancel: Cancel,
          datefrom: DateFrom,
          destination: Destination,
          fee: Fee,
          model: Model,
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
  getHistory,
  getHistoryById: (req, res) => res.status(200).json(res.history),
  createHistory: async (req, res) => {
    const { body } = req;
    const userId = req.decoded.result.id;

    try {
      // eslint-disable-next-line node/no-unsupported-features/es-syntax
      const results = await create({ ...body, userId });

      if (results) {
        return res.status(201).send(`History Sucessfully Created.`);
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
    return res.status(500);
  },
  updateHistory: async (req, res) => {
    const { body } = req;

    try {
      const results = await update(req.params.id, body);

      if (results) {
        return res.status(201).send(`History Sucessfully Updated.`);
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
    return res.status(500);
  },
  cancelBooking: async (req, res) => {
    try {
      const results = await cancel(req.params.id);

      if (results) {
        return res.status(201).send(`Booking Canceled Succesfully`);
      }
    } catch (err) {
      return res.status(500).send(err.message);
    }
    return res.status(500);
  },
};
