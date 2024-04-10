const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const servicioSchema = new Schema({
  placa: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
    default: Date.now,
  },
  clienteNombre: {
    type: String,
    required: true,
  },
  modeloAuto: {
    type: String,
    required: true,
  },
  clienteTelefono: {
    type: Number,
    required: true,
  },
  clienteCorreo: {
    type: String,
    required: true,
  },
  empleadoEncargado: {
    type: String,
    required: true,
  },
  tipoServicio: {
    type: String,
    required: true,
  },
  calificacion: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("servicioModel", servicioSchema);
