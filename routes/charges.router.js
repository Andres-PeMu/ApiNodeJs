const express = require("express");

const { create, find, findOne, update, deleteOne } = require('./../services/charges.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCustomerSchema, updateCustomerSchema, getCustomerSchema } = require('./../schemas/charges.schema');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const charges = await find();
    res.json(charges);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const charges = await findOne(id);
      res.json(charges);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCharges = await create(body);
      res.status(201).json(newCharges);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const charges = await update(id, body);
      res.json(charges);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getCustomerSchema, 'params'),
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