const Transaksi = require("../models/transaksi");

// pemasukan
module.exports.newPemasukan = (req, res) => {
  res.render("KelolaUang/tambah/pemasukan");
};

module.exports.savePemasukan = async (req, res) => {
  let raw = req.body.transaksi.nominal;
  let cleaned = raw.replace(/\./g, "");
  let num = Number(cleaned);

  req.body.transaksi.nominal = num;
  req.body.transaksi.jenis = "Pemasukan";

  const transaksi = new Transaksi(req.body.transaksi);
  console.log(transaksi);
  await transaksi.save();
  res.redirect("/KelolaUang");
};

// pengeluaran
module.exports.newPengeluaran = (req, res) => {
  res.render("KelolaUang/tambah/pengeluaran");
};

module.exports.savePengeluaran = async (req, res) => {
  let raw = req.body.transaksi.nominal;
  let cleaned = raw.replace(/\./g, "");
  let num = Number(cleaned);

  req.body.transaksi.nominal = num;
  req.body.transaksi.jenis = "Pengeluaran";

  const transaksi = new Transaksi(req.body.transaksi);
  console.log(transaksi);
  await transaksi.save();
  res.redirect("/KelolaUang");
};
