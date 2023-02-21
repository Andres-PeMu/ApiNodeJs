const boom = require("@hapi/boom");

const sequelize = require("../libs/sequelize");

const create = async (data) => {
  const query = `INSERT INTO public."GASTOS_OPERACIONALES"(
	             "TIPO_GASTO", "VALOR_HORA", "HORAS_TRABAJADAS", "ID_TRABAJADOR", "ID_SECTOR", "VALOR TOTAL")
	             VALUES ('${data.expenseType}', ${data.hourValue}, ${data.hourValueWorked}, ${data.idWorker}, 
                 ${data.idSector}, ${data.fullValue});`;
  await sequelize.query(query);
  return data;
};

const find = async () => {
  const query = `SELECT "ID_GASTOS", "TIPO_GASTO", "VALOR_HORA", "HORAS_TRABAJADAS", "ID_TRABAJADOR", "ID_SECTOR", "VALOR TOTAL"
                 FROM public."GASTOS_OPERACIONALES"`;
  const [data] = await sequelize.query(query);
  return data;
};

const findOne = async (id) => {
  const query = `SELECT "ID_GASTOS", "TIPO_GASTO", "VALOR_HORA", "HORAS_TRABAJADAS", "ID_TRABAJADOR", "ID_SECTOR", "VALOR TOTAL"
                 FROM public."GASTOS_OPERACIONALES" 
                 WHERE "ID_GASTOS" = ${id}`;
  const [data] = await sequelize.query(query);
  if (!data[0]) {
    throw boom.notFound("expenses not found");
  }
  return data;
};

const update = async (id, changes) => {
  const queryDate = `UPDATE public."GASTOS_OPERACIONALES"
                     SET "TIPO_GASTO"='${changes.expenseType}', "VALOR_HORA"=${changes.hourValue}, 
                     "HORAS_TRABAJADAS"=${changes.hourValueWorked}, "ID_TRABAJADOR"=${changes.idWorker}, "ID_SECTOR"=${changes.idSector}, 
                     "VALOR TOTAL"=${changes.fullValue}
                     WHERE "ID_GASTOS"=${id}`;
  await sequelize.query(queryDate);
  const query = `SELECT "ID_GASTOS", "TIPO_GASTO", "VALOR_HORA", "HORAS_TRABAJADAS", "ID_TRABAJADOR", "ID_SECTOR", "VALOR TOTAL"
                FROM public."GASTOS_OPERACIONALES"
                WHERE "ID_GASTOS" = ${id}`;
  const [data] = await sequelize.query(query);
  if (!data[0]) {
    throw boom.notFound("expenses not found");
  }
  return data;
};

const deleteOne = async (id) => {
  const queryDate = `DELETE FROM public."GASTOS_OPERACIONALES" WHERE "ID_GASTOS"=${id}`;
  await sequelize.query(queryDate);
  return { id };
};

module.exports = { create, find, findOne, update, deleteOne };