const express = require("express");

const { create, find, findOne, findAndWorkerAndOe, update, deleteOne } = require('./../services/payments.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createPaymentsSchema, updatePaymentSchema, getPaymentSchema } = require('./../schemas/payments.schema');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const payments = await find();
    res.json(payments);
  } catch (error) {
    next(error);
  }
});

router.get("/worker/oe", async (req, res, next) => {
  try {
    const payments = await findAndWorkerAndOe();
    res.json(payments);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getPaymentSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const payments = await findOne(id);
      res.json(payments);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createPaymentsSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newPayments = await create(body);
      res.status(201).json(newPayments);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getPaymentSchema, 'params'),
  validatorHandler(updatePaymentSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const payments = await update(id, body);
      res.json(payments);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getPaymentSchema, 'params'),
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