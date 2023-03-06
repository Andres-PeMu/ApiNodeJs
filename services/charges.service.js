const boom = require("@hapi/boom");

const sequelize = require("../libs/sequelize");

const create = async (data) => {
  const query = `INSERT INTO public."COBROS"(
                  "VALOR_COBRO", "ID_CLIENTE")
                  VALUES (${data.collectionValue}, ${data.id_customer});`;
  await sequelize.query(query);
  return data;
};

const find = async () => {
  const query = `SELECT "ID_COBROS", "VALOR_COBRO", "ID_VENCOCLI", "ID_CLIENTE"
	                FROM public."COBROS"`;
  const [data] = await sequelize.query(query);
  return data;
};

const findAndCustomer = async () => {
  const query = `SELECT "ID_COBROS", "ID_CLIENTE", "VALOR_COBRO", "FECHA_PAGO", "NOMBRE", "APELLIDO", "IDENTIFICACION", "CORREO", "TELEFONO"
	                FROM public."COBROS"
	                INNER JOIN public."CLIENTES" 
	                ON "ID_CLIENTE" = "ID_CLIENTES"`;
  const [data] = await sequelize.query(query);
  return data;
};

const findOne = async (id) => {
  const query = `SELECT "ID_COBROS", "VALOR_COBRO", "ID_VENCOCLI", "ID_CLIENTE"
                  FROM public."COBROS" 
                  WHERE "ID_COBROS" = ${id}`;
  const [data] = await sequelize.query(query);
  if (!data[0]) {
    throw boom.notFound("charges not found");
  }
  return data;
};

const update = async (id, changes) => {
  const query = `UPDATE public."COBROS"
	                SET "VALOR_COBRO"=${changes.collectionValue}, "ID_CLIENTE"=${changes.id_customer}
                  WHERE "ID_COBROS"=${id}`;
  await sequelize.query(query);
  const selecQuery = `SELECT "ID_COBROS", "VALOR_COBRO", "ID_VENCOCLI", "ID_CLIENTE"
                        FROM public."COBROS" 
                        WHERE "ID_COBROS" = ${id}`;
  const [data] = await sequelize.query(selecQuery);
  if (!data[0]) {
    throw boom.notFound("charges not found");
  }
  return data;
};

const deleteOne = async (id) => {
  const queryDate = `DELETE FROM public."COBROS" WHERE "ID_COBROS"=${id}`;
  await sequelize.query(queryDate);
  return { id };
};

module.exports = { create, find, findOne, update, deleteOne, findAndCustomer };