const Transaksi = require("../models/transaksi");
const Rekening = require("../models/rekening");

// pemasukan
module.exports.newPemasukan = async (req, res) => {
  const rekening = await Rekening.find();
  res.render("KelolaUang/tambah/pemasukan", { rekening });
};

module.exports.savePemasukan = async (req, res) => {
  const raw = req.body.transaksi.nominal;
  const cleaned = raw.replace(/\./g, "");
  const num = Number(cleaned);

  const rekeningId = req.body.transaksi.rekening; // dari form
  const rekening = await Rekening.findById(rekeningId);

  const transaksi = new Transaksi({
    ...req.body.transaksi,
    nominal: num,
    jenis: "Pemasukan",
    rekening: rekening._id,
    author: req.user._id,
  });

  rekening.author = req.user._id;
  await transaksi.save();
  await Rekening.findByIdAndUpdate(rekeningId, {
    $push: { transaksis: transaksi._id },
    $inc: { nominal: transaksi.nominal }, // optional kalau ingin update saldo
  });
  req.flash("success", `Transaksi Berhasil Disimpan`);
  res.redirect("/KelolaUang/transaksi");
};

// pengeluaran
module.exports.newPengeluaran = async (req, res) => {
  const rekening = await Rekening.find();
  res.render("KelolaUang/tambah/pengeluaran", { rekening });
};

module.exports.savePengeluaran = async (req, res) => {
  let raw = req.body.transaksi.nominal;
  let cleaned = raw.replace(/\./g, "");
  let num = Number(cleaned);

  const rekeningId = req.body.transaksi.rekening;
  const rekening = await Rekening.findById(rekeningId);

  const transaksi = new Transaksi({
    ...req.body.transaksi,
    nominal: num,
    jenis: "Pengeluaran",
    rekening: rekening._id,
    author: req.user._id,
  });

  rekening.author = req.user._id;
  await transaksi.save();
  await Rekening.findByIdAndUpdate(rekeningId, {
    $inc: { nominal: -num },
  });
  req.flash("success", `Transaksi Berhasil Disimpan`);
  res.redirect("/KelolaUang/transaksi");
};
