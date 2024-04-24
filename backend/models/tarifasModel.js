const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const precioSchema = new Schema({
  carro: {
    type: Number,
    required: true,
  },
  camioneta: {
    type: Number,
    required: true,
  },
});

const tarifasSchema = new Schema(
  {
    servicio: {
      type: String,
      required: true,
      unique: true,
    },
    precio: [precioSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("tarifasModel", tarifasSchema);
