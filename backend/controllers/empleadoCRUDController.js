const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const createToken = (_id, rol) => {
  return jwt.sign({ _id, rol }, process.env.SECRET_STRING, {
    expiresIn: "1d",
  });
};
//controlador de mostrar empleadoss

const getEmployees = async (req, res) => {
  const employees = await userModel.find({ rol: "empleado" });
  if (!employees) {
    return res.status(400).json({ error: "Error buscando empleados" });
  }
  res.status(200).json(employees);
};
//controlador de mostrar un solo empleado

const getEmployee = async (req, res) => {
  const { id } = req.params;
  console.log(id);
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

const patchEmployee = (req, res) => res.json({ msg: "editar empleado" });

//controlador de eliminar empleado

const deleteEmployee = (req, res) => {
  res.json({ msg: "eliminar empleado" });
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  patchEmployee,
  deleteEmployee,
};
