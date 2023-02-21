const boom = require("@hapi/boom");

const sequelize = require("../libs/sequelize");

const create = async (data) => {
  const query = `INSERT INTO public."PAGOS"(
	            "VALOR_PAGO", "ID_TRABAJOR", "ID_GASTOS_OPERACIONES")
	            VALUES (${data.paymentValue}, ${data.idWorker}, ${data.idOperationalExpenses});`;
  await sequelize.query(query);
  return data;
};

const find = async () => {
  const query = `SELECT "ID_PAGOS", "VALOR_PAGO", "ID_TRABAJOR", "ID_GASTOS_OPERACIONES"
                 FROM public."PAGOS"`;
  const [data] = await sequelize.query(query);
  return data;
};

const findOne = async (id) => {
  const query = `SELECT "ID_PAGOS", "VALOR_PAGO", "ID_TRABAJOR", "ID_GASTOS_OPERACIONES"
                 FROM public."PAGOS" 
                 WHERE "ID_PAGOS" = ${id}`;
  const [data] = await sequelize.query(query);
  if (!data[0]) {
    throw boom.notFound("sector not found");
  }
  return data;
};

const update = async (id, changes) => {
  const queryDate = `UPDATE public."PAGOS" SET "VALOR_PAGO"='${changes.paymentValue}', "ID_TRABAJOR"=${changes.idWorker}, 
                    "ID_GASTOS_OPERACIONES"=${changes.idOperationalExpenses} 
                    WHERE "ID_PAGOS"=${id}`;
  await sequelize.query(queryDate);
  const query = `SELECT "ID_PAGOS", "VALOR_PAGO", "ID_TRABAJOR", "ID_GASTOS_OPERACIONES"
                FROM public."PAGOS" 
                WHERE "ID_PAGOS" = ${id}`;
  const [data] = await sequelize.query(query);
  if (!data[0]) {
    throw boom.notFound("sector not found");
  }
  return data;
};

const deleteOne = async (id) => {
  const queryDate = `DELETE FROM public."PAGOS" WHERE "ID_PAGOS"=${id}`;
  await sequelize.query(queryDate);
  return { id };
};

module.exports = { create, find, findOne, update, deleteOne };
