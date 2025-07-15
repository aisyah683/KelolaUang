const mongoose = require("mongoose");

const rekeningSchema = new mongoose.Schema({
  nama: String,
  nominal: Number,
  keterangan: String,
});

module.exports = mongoose.model("rekening", rekeningSchema);
