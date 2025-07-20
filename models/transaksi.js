const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transaksiSchema = new Schema({
  nominal: { type: Number, default: 0 },
  tanggal: { type: Date, default: Date.now },
  jenis: String,
  keterangan: String,
  kategori: String,
  // gunakan single reference, sesuai nama model "rekenings"
  rekening: { type: Schema.Types.ObjectId, ref: "rekening" },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

transaksiSchema.post("save", async function (doc) {
  const Rekening = mongoose.model("rekening");
  await Rekening.findByIdAndUpdate(doc.rekening, {
    $push: { transaksis: doc._id },
  });
});

module.exports = mongoose.model("transaksi", transaksiSchema);
