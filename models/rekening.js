const mongoose = require("mongoose");
const Transaksi = require("./transaksi");

const rekeningSchema = new mongoose.Schema({
  nama: String,
  nominal: { type: Number, default: 0 },
  keterangan: String,
  transaksis: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "transaksi",
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

rekeningSchema.post("save", async function (doc) {
  // Setelah rekening berhasil dibuat
  await Transaksi.create({
    jenis: "Pemasukan",
    nominal: doc.nominal,
    kategori: `Setoran awal ${doc.nama}`,
    keterangan: `Saldo ${doc.nama}`,
    tanggal: new Date(),
    rekening: doc._id,
    author: doc.author,
  });
});

Transaksi.schema.post("save", async function (transaksiDoc) {
  // Setiap kali transaksi disimpan juga disimpan datanya ke rekening
  await mongoose.model("Rekening").findByIdAndUpdate(transaksiDoc.rekening, {
    $push: { transaksis: transaksiDoc._id },
  });
});

rekeningSchema.pre("findOneAndDelete", async function () {
  // setiap rekening terhapus maka data nya juga terhapus
  const doc = await this.model.findOne(this.getFilter());
  if (!doc) return;
  await mongoose.model("transaksi").deleteMany({ rekening: doc._id });
});

module.exports = mongoose.model("rekening", rekeningSchema);
