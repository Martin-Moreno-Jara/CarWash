const mongoose = require("mongoose");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const logModel = require("../models/logModel");

const createToken = (_id, rol) => {
  return jwt.sign({ _id, rol }, process.env.SECRET_STRING, {
    expiresIn: "200d",
  });
};

//controlador del inicio de sesión
const loginUser = async (req, res) => {
  const { usuario, contrasena } = req.body;
  try {
    const usuarioLogeado = await userModel.login(usuario, contrasena);
    const token = createToken(usuarioLogeado._id, usuarioLogeado.rol);
    await logModel.create({
      madeBy: usuario,
      action: "LOGIN",
      action_detail: `user ${usuario} tried to login`,
      status: "SUCCESSFUL",
    });
    res.status(200).json({
      usuario,
      nombre: usuarioLogeado.nombre,
      apellido: usuarioLogeado.apellido,
      id: usuarioLogeado._id,
      rol: usuarioLogeado.rol,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const logoutUser = async (req, res) => {
  const { usuario } = req.body;
  await logModel.create({
    madeBy: usuario,
    action: "LOGOUT",
    action_detail: `user ${usuario} tried to log out`,
    status: "SUCCESSFUL",
  });
  res.status(200).json({ msg: "unlogged" });
};

// Controlador para actualizar la contraseña
const updatePassword = async (req, res) => {
  const { usuario, contrasena, nuevaContrasena } = req.body;

  try {
    const updatedUser = await userModel.updatePassword(
      usuario,
      contrasena,
      nuevaContrasena
    );
    res.status(200).json({
      message: "Contraseña actualizada correctamente",
      usuario: updatedUser.usuario,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//controlador de creación de usuarios
const getUsuarioByUser = async (req, res) => {
  const { user } = req.params;
  console.log("Usuario recibido en params:", user); // Depuración: imprimir el parámetro recibido

  try {
    const usuario = await userModel.findOne({ usuario: user });
    console.log("Usuario encontrado en DB:", usuario); // Depuración: imprimir el resultado de la consulta

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error("Error durante la búsqueda en DB:", error); // Depuración: imprimir el error
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, logoutUser, updatePassword, getUsuarioByUser };
