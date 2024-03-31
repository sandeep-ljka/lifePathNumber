const mongoose = require("mongoose");

const lifePathNumberSchema = new mongoose.Schema({
  lifePathNumber: { type: String, unique: true },
  description: String,
});

const LifePathNumbers = mongoose.model("LifePathNumbers", lifePathNumberSchema);

module.exports = LifePathNumbers;
