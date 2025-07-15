const Transaksi = require("../models/transaksi");
const Rekening = require("../models/rekening");

module.exports.home = async (req, res) => {
  const transaksi = await Transaksi.find({});
  const rekening = await Rekening.find({});
  res.render("KelolaUang/index", { transaksi, rekening });
};

module.exports.transaksi = async (req, res) => {
  const transaksi = await Transaksi.find({});
  res.render("KelolaUang/transaksi", { transaksi });
};
