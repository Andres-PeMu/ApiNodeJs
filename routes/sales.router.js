const express = require("express");

const { create, find, findOne, update, deleteOne } = require('../services/sales.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createSalesSchema, updateSalesSchema, getSalesSchema } = require('../schemas/sales.schema');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const sales = await find();
    res.json(sales);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getSalesSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const sales = await findOne(id);
      res.json(sales);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createSalesSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSale = await create(body);
      res.status(201).json(newSale);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getSalesSchema, 'params'),
  validatorHandler(updateSalesSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const sales = await update(id, body);
      res.json(sales);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getSalesSchema, 'params'),
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