const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const encargadoSchema = new Schema({
  encargadoId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  encargadoNombre: {
    type: String,
    required: true,
  },
});

const servicioSchema = new Schema(
  {
    cliente: {
      type: String,
      required: true,
    },
    placa: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
      default: Date.now,
    },
    tipoAuto: {
      type: String,
      required: true,
    },
    tipoServicio: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
    },
    encargado: {
      type: [encargadoSchema],
      required: true,
    },
    carInfo: {
      type: String,
      required: false,
      default: "",
    },
    estado: {
      type: String,
      required: true,
      default: "En proceso",
    },
    calificacion: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("servicioModel", servicioSchema);
