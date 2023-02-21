const express = require("express");

const { create, find, findOne, update, deleteOne } = require('./../services/lots.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createLotsSchema, updateLotsSchema, getLotsSchema } = require('./../schemas/lots.schema');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const lots = await find();
    res.json(lots);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getLotsSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const lots = await findOne(id);
      res.json(lots);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createLotsSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newLots = await create(body);
      res.status(201).json(newLots);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getLotsSchema, 'params'),
  validatorHandler(updateLotsSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const lots = await update(id, body);
      res.json(lots);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getLotsSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteOne(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;