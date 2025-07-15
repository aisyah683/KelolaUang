const mongoose = require("mongoose");

const transaksiSchema = new mongoose.Schema({
  tanggal: Date,
  jenis: { type: String, enum: ["Pemasukan", "Pengeluaran"] },
  kategori: String,
  keterangan: String,
  nominal: Number,
});

module.exports = mongoose.model("transaksi", transaksiSchema);
