const tarifasModel = require("../models/tarifasModel");

const getTarifas = async (req, res) => {
  try {
    const tarifas = await tarifasModel.find();
    res.status(200).json(tarifas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postTarifas = async (req, res) => {
  const { servicio, precio } = req.body;
  if (!servicio || !precio) {
    throw Error("Debe llenar todos los campos");
  }
  try {
    const tarifa = await tarifasModel.create({ servicio, precio });
    res.status(200).json(tarifa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTarifas, postTarifas };
