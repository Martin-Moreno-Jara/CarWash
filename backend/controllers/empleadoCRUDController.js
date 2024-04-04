const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id, rol) => {
  return jwt.sign({ _id, rol }, process.env.SECRET_STRING, {
    expiresIn: "1d",
  });
};
//controlador de mostrar empleadoss

const getEmployees = (req, res) => {
  res.json({ msg: "mostrar empleados" });
};
//controlador de mostrar un solo empleado

const getEmployee = (req, res) => {
  res.json({ msg: "mostrar empleado" });
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
    const token = createToken(usuarioCreado._id, usuarioCreado.rol);
    res.status(200).json({ usuario, token });
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
