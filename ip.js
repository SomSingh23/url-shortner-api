const mongoose = require("mongoose");
let Schema = new mongoose.Schema(
  {
    ip: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

let Ip = mongoose.model("Ip", Schema);
module.exports = Ip;
