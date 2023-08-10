const mongoose = require("mongoose");
let Schema = new mongoose.Schema(
  {
    originalUrl: {
      required: true,
      type: String,
    },
    redirectUrl: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

let AddData = mongoose.model("AddData", Schema);
module.exports = AddData;
