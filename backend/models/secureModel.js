const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const secure = new Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  key: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("secureModel", secure);
