const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema(
  {
    madeBy: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    action_detail: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("logModel", logSchema);
