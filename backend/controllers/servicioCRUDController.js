const mongoose = require("mongoose");
const servicioModel = require("../models/servicioModel");
const logModel = require("../models/logModel");

// mostrar todos los servicios (admin)
const getAllServices = async (req, res) => {
  //TODO:perdir autenticación luego de hacer front
  try {
    const servicios = await servicioModel.find().sort({ createdAt: -1 });
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
    const servicios = await servicioModel
      .find({
        "encargado.encargadoId": objectId,
      })
      .sort({ createdAt: -1 });
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

// const patchService = (req, res) => 
const patchService = async (req, res) => {
  // res.json({ msg: "editar servicio" });
  const { id } = req.params;
  const { cliente, placa, tipoAuto, tipoServicio, precio, encargado, carInfo } = req.body;

  try {
    const servicioCambiado = await servicioModel.updateService(
      id,
      cliente,
      placa,
      tipoAuto,
      tipoServicio,
      precio,
      encargado,
      carInfo
    );
    await logModel.create({
      //TODO: cambiar madeby, action_detail
      madeBy: "Yet no authentication",
      action: "UPDATE SERVICE",
      action_detail: `Admin ${1} updated employee ${1}`,
      status: "SUCCESSFUL",
    });
    res.status(200).json(servicioCambiado);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

//controlador de eliminar servicio

const deleteService = async (req, res) => {
  //res.json({ msg: "eliminar servicio" });
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "No hay valor de id" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "id invalida" });
    }
    const deletedService = await servicioModel.findByIdAndDelete(id);
    if (!deletedService) {
      return res.status(404).json({ error: "Servicio no encontrado" });
    }
    await logModel.create({
      madeBy: req.loggedUser.usuario,
      action: "DELETE SERVICE",
      action_detail: `Servicio ${id} eliminado de manera exitosa`,
      status: "SUCCESSFUL",
    });
    res.status(200).json(deletedService);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllServices,
  getserviceByEmployee,
  getService,
  createService,
  patchService,
  deleteService,
};
