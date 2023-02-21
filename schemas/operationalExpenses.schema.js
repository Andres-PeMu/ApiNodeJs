const Joi = require('joi');

// "TIPO_GASTO", "VALOR_HORA", "HORAS_TRABAJADAS", "ID_TRABAJADOR", "ID_SECTOR", "VALOR TOTAL"

const id = Joi.number();
const expenseType = Joi.string();
const hourValue = Joi.number();
const hourValueWorked = Joi.number();
const idWorker = Joi.number();
const idSector = Joi.number();
const fullValue = Joi.number();

const createOeSchema = Joi.object({
    expenseType: expenseType.required(),
    hourValue: hourValue.required(),
    hourValueWorked: hourValueWorked.required(),
    idWorker: idWorker.required(),
    idSector: idSector.required(),
    fullValue: fullValue.required()
});

const updateOeSchema = Joi.object({
    expenseType: expenseType.required(),
    hourValue: hourValue.required(),
    hourValueWorked: hourValueWorked.required(),
    idWorker: idWorker.required(),
    idSector: idSector.required(),
    fullValue: fullValue.required()
});

const getOeSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOeSchema, updateOeSchema, getOeSchema }