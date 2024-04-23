const mongoose = require("mongoose");
const servicioModel = require("../models/servicioModel");
const logModel = require("../models/logModel");

// mostrar todos los servicios (admin)
const getAllServices = async (req, res) => {
  //TODO:perdir autenticación luego de hacer front
  try {
    const servicios = await servicioModel.find();
    res.status(200).json(servicios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getserviceByEmployee = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }
  const objectId = new mongoose.Types.ObjectId(id);
  //TODO:perdir autenticación luego de hacer front
  try {
    const servicios = await servicioModel.find({
      "encargado.encargadoId": objectId,
    });
    res.status(200).json(servicios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//controlador de mostrar un servicio

const getService = (req, res) => {};

//crear servicio
const createService = async (req, res) => {
  const { cliente, placa, tipoAuto, tipoServicio, precio, encargado, carInfo } =
    req.body;
  try {
    const servicio = await servicioModel.insertService(
      cliente,
      placa,
      tipoAuto,
      tipoServicio,
      precio,
      encargado,
      carInfo
    );
    await logModel.create({
      //TODO: cambiar madeby
      madeBy: "Yet no authentication",
      action: "CREATE SERVICE",
      action_detail: `user USUARIO successfully created service`,
      status: "SUCCESSFUL",
    });
    res.status(200).json(servicio);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

//controlador de editar servicio

const patchService = (req, res) => res.json({ msg: "editar servicio" });

//controlador de eliminar servicio

const deleteService = (req, res) => {
  res.json({ msg: "eliminar servicio" });
};

module.exports = {
  getAllServices,
  getserviceByEmployee,
  getService,
  createService,
  patchService,
  deleteService,
};
