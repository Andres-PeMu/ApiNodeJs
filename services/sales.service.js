const boom = require("@hapi/boom");

const sequelize = require("../libs/sequelize");

const create = async (data) => {
  const query = `INSERT INTO public."VENTAS"(
                  "VALOR_VENTA", "ID_LOTES", "ID_CLIENTE")
                  VALUES (${data.salesValue}, ${data.id_lots}, ${data.id_customer});`;
  await sequelize.query(query);
  return data;
};

const find = async () => {
  const query = `SELECT "ID_VENTAS", "VALOR_VENTA", "ID_VENCOCLI", "ID_LOTES", "ID_CLIENTE"
	                FROM public."VENTAS";`;
  const [data] = await sequelize.query(query);
  return data;
};

const findOne = async (id) => {
  const query = `SELECT "ID_VENTAS", "VALOR_VENTA", "ID_VENCOCLI", "ID_LOTES", "ID_CLIENTE"
	                FROM public."VENTAS" WHERE "ID_VENTAS"= ${id}`;
  const [data] = await sequelize.query(query);
  if (!data[0]) {
    throw boom.notFound("charges not found");
  }
  return data;
};

const update = async (id, changes) => {
  const query = `UPDATE public."VENTAS"
	                SET "VALOR_VENTA"=${changes.salesValue}, "ID_LOTES"=${changes.id_lots}, "ID_CLIENTE"=${changes.id_customer}
                  WHERE "ID_VENTAS"=${id}`;
  await sequelize.query(query);
  const selecQuery = `SELECT "ID_VENTAS", "VALOR_VENTA", "ID_VENCOCLI", "ID_LOTES", "ID_CLIENTE"
                        FROM public."VENTAS" WHERE "ID_VENTAS"= ${id}`;
  const [data] = await sequelize.query(selecQuery);
  if (!data[0]) {
    throw boom.notFound("charges not found");
  }
  return data;
};

const deleteOne = async (id) => {
  const queryDate = `DELETE FROM public."VENTAS" WHERE "ID_VENTAS"=${id}`;
  await sequelize.query(queryDate);
  return { id };
};

module.exports = { create, find, findOne, update, deleteOne };