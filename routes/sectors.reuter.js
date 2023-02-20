const express = require("express");

const { create, find, findOne, update, deleteOne } = require('./../services/sectors.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createSectorsSchema, updateSectorsSchema, getSectorSchema } = require('./../schemas/sectors.schema');

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const sectors = await find();
    res.json(sectors);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getSectorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const sector = await findOne(id);
      res.json(sector);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createSectorsSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newSector = await create(body);
      res.status(201).json(newSector);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getSectorSchema, 'params'),
  validatorHandler(updateSectorsSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const sector = await update(id, body);
      res.json(sector);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getSectorSchema, 'params'),
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
