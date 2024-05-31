const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const logModel = require("../models/logModel");

const createToken = (_id, rol) => {
  return jwt.sign({ _id, rol }, process.env.SECRET_STRING, {
    expiresIn: "1y",
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

  try {
    await logModel.create({
      madeBy: req.loggedUser.usuario,
      action: "GET EMPLOYEE",
      action_detail: `Admin ${req.loggedUser.usuario} got employee`,
      status: "SUCCESSFUL",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
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
    passConfirm,
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
      contrasena,
      passConfirm,
      req.loggedUser.usuario
    );
    await logModel.create({
      madeBy: req.loggedUser.usuario,
      action: "CREATE EMPLOYEE",
      action_detail: `Admin ${req.loggedUser.usuario} created employee ${usuario}`,
      status: "SUCCESSFUL",
    });

    res.status(200).json(usuarioCreado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//controlador de editar empleado

const patchEmployee = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, cedula, direccion, telefono, usuario } = req.body;

  try {
    const empleadoCambiado = await userModel.updateEmployee(
      id,
      nombre,
      apellido,
      cedula,
      direccion,
      telefono,
      usuario,
      req.loggedUser.usuario
    );
    await logModel.create({
      madeBy: req.loggedUser.usuario,
      action: "UPDATE EMPLOYEE",
      action_detail: `Admin ${req.loggedUser.usuario} updated employee ${usuario}`,
      status: "SUCCESSFUL",
    });
    res.status(200).json(empleadoCambiado);
  } catch (error) {
    console.log(error);
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
  await logModel.create({
    madeBy: req.loggedUser.usuario,
    action: "DELETE EMPLOYEE",
    action_detail: `Admin ${req.loggedUser.usuario} deleted employee ${deletion.usuario}`,
    status: "SUCCESSFUL",
  });
  res.status(200).json(deletion);
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  patchEmployee,
  deleteEmployee,
};
