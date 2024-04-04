const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id, rol) => {
  return jwt.sign({ _id, rol }, process.env.SECRET_STRING, {
    expiresIn: "1d",
  });
};

//controlador del inicio de sesión
const loginUser = async (req, res) => {
  const { usuario, contrasena } = req.body;
  try {
    const usuarioLogeado = await userModel.login(usuario, contrasena);
    const token = createToken(usuarioLogeado._id, usuarioLogeado.rol);
    res.status(200).json({ usuario, rol: usuarioLogeado.rol, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//controlador de creación de usuarios

module.exports = { loginUser };
