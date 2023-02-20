const Joi = require('joi');

const id = Joi.number();
const name = Joi.string().min(3).max(15);
const lotNumber = Joi.number().integer().min(10);

const createSectorsSchema = Joi.object({
  name: name.required(),
  lotNumber: lotNumber.required()
});

const updateSectorsSchema = Joi.object({
  name: name.required(),
  lotNumber: lotNumber.required()
});

const getSectorSchema = Joi.object({
  id: id.required(),
});

module.exports = { createSectorsSchema, updateSectorsSchema, getSectorSchema }