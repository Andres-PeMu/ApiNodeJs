const Joi = require("joi");

const id = Joi.number();
const lotNumber = Joi.number();
const lotValue = Joi.number();
const id_sector = Joi.number();
const id_customer = Joi.number();

const createLotsSchema = Joi.object({
    lotNumber: lotNumber.required(),
    lotValue: lotValue,
    id_sector: id_sector.required(),
    id_customer: id_customer,
});

const updateLotsSchema = Joi.object({
  lotNumber: lotNumber.required(),
  lotValue: lotValue,
  id_sector: id_sector.required(),
  id_customer: id_customer,
});

const getLotsSchema = Joi.object({
  id: id.required(),
});

module.exports = { createLotsSchema, updateLotsSchema, getLotsSchema };
