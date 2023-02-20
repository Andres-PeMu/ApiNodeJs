const express = require("express");

const { create, find, findOne, update, deleteOne } = require('./../services/workers.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createWorkersSchema, updateWorkersSchema, getWorkersSchema } = require('./../schemas/workers.schema');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const workers = await find();
    res.json(workers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getWorkersSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const worker = await findOne(id);
      res.json(worker);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createWorkersSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newWorker = await create(body);
      res.status(201).json(newWorker);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getWorkersSchema, 'params'),
  validatorHandler(updateWorkersSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const worker = await update(id, body);
      res.json(worker);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getWorkersSchema, 'params'),
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