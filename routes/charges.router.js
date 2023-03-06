const express = require("express");

const { create, find, findOne, update, deleteOne, findAndCustomer } = require('./../services/charges.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createChargesSchema, updateChargesSchema, getChargesSchema } = require('./../schemas/charges.schema');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const charges = await find();
    res.json(charges);
  } catch (error) {
    next(error);
  }
});

router.get("/customers", async (req, res, next) => {
  try {
    const charges = await findAndCustomer();
    res.json(charges);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getChargesSchema, 'params'),
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
  validatorHandler(createChargesSchema, 'body'),
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
  validatorHandler(getChargesSchema, 'params'),
  validatorHandler(updateChargesSchema, 'body'),
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
  validatorHandler(getChargesSchema, 'params'),
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