const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const secureModel = require("../models/secureModel");

const createToken = (_id, rol) => {
  return jwt.sign({ _id, rol }, process.env.SECRET_STRING, {
    expiresIn: "1d",
  });
};
//controlador de mostrar empleadoss

const getEmployees = async (req, res) => {
  const employees = await userModel
    .find({ rol: "empleado" })
    .sort({ createdAt: -1 });
  if (!employees) {
    return res.status(400).json({ error: "Error buscando empleados" });
  }
  res.status(200).json(employees);
};
//controlador de mostrar un solo empleado

const getEmployee = async (req, res) => {
  const { id } = req.params;
  const idValidation = mongoose.Types.ObjectId.isValid(id);
  if (!idValidation) {
    return res.status(400).json({ error: "id de empleado invalida" });
  }

  const employee = await userModel.findById(id);

  if (!employee) {
    return res.status(400).json({ error: "Error buscando al empleado" });
  }
  res.status(200).json(employee);
};

//traer plain contrasena
const getKey = async (req, res) => {
  const { id } = req.params;
  const idValidation = mongoose.Types.ObjectId.isValid(id);
  if (!idValidation) {
    return res.status(400).json({ error: "id de empleado invalida" });
  }

  const employee = await secureModel.findById(id);

  if (!employee) {
    return res.status(400).json({ error: "Error buscando al empleado" });
  }
  res.status(200).json(employee);
};

//controlador de crear empleado

const createEmployee = async (req, res) => {
  const {
    nombre,
    apellido,
    cedula,
    direccion,
    telefono,
    rol,
    usuario,
    contrasena,
  } = req.body;
  try {
    const usuarioCreado = await userModel.signup(
      nombre,
      apellido,
      cedula,
      direccion,
      telefono,
      rol,
      usuario,
      contrasena
    );
    res.status(200).json(usuarioCreado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//controlador de editar empleado

const patchEmployee = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, cedula, direccion, telefono, usuario, contrasena } =
    req.body;
  try {
    const empleadoCambiado = await userModel.updateEmployee(
      id,
      nombre,
      apellido,
      cedula,
      direccion,
      telefono,
      usuario,
      contrasena
    );
    res.status(200).json(empleadoCambiado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//controlador de eliminar empleado

const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "no hay valor de id" });
  }
  const idValidation = mongoose.Types.ObjectId.isValid(id);
  if (!idValidation) {
    return res.status(400).json({ error: "id de empleado invalida" });
  }
  const deletion = await userModel.findOneAndDelete({ _id: id });
  //const keyDeletion = await secureModel.deleteOne({ _id: id });
  res.status(200).json(deletion);
};

module.exports = {
  getEmployees,
  getEmployee,
  getKey,
  createEmployee,
  patchEmployee,
  deleteEmployee,
};
