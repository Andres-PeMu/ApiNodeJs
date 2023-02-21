const express = require("express");

const { create, find, findOne, update, deleteOne } = require('./../services/operationalExpenses.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createOeSchema, updateOeSchema, getOeSchema } = require('./../schemas/operationalExpenses.schema');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const oEs = await find();
    res.json(oEs);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getOeSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const oE = await findOne(id);
      res.json(oE);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOeSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newOE = await create(body);
      res.status(201).json(newOE);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getOeSchema, 'params'),
  validatorHandler(updateOeSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const oE = await update(id, body);
      res.json(oE);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getOeSchema, 'params'),
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