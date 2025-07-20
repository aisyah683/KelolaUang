const Transaksi = require("../models/transaksi");
const Rekening = require("../models/rekening");

module.exports.home = async (req, res) => {
  const transaksi = await Transaksi.find({ author: req.user._id }).populate(
    "rekening"
  );
  const rekening = await Rekening.find({ author: req.user._id });
  res.render("KelolaUang/index", { transaksi, rekening });
};

module.exports.transaksi = async (req, res) => {
  const transaksi = await Transaksi.find({ author: req.user._id })
    .sort({ tanggal: -1, _id: -1 })
    .populate("rekening"); // penting agar bisa akses `isi.rekening.nama`
  res.render("KelolaUang/transaksi", { transaksi });
};
