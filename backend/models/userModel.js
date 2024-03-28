const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  cedula: {
    type: Number,
    required: true,
    unique: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  telefono: {
    type: Number,
    required: true,
    unique: true,
  },
  rol: {
    type: String,
    required: true,
    default: "empleado",
  },
  usuario: {
    type: String,
    required: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userModel", userSchema);
