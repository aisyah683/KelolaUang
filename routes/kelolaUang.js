const express = require("express");
const route = express.Router();
const Transaksi = require("../controllers/pengeluaran");
const Rekening = require("../controllers/rekening");

// home
app.get("/", async (req, res) => {
  const transaksi = await Transaksi.find({});
  res.render("KelolaUang/index", { transaksi });
});

// rekening
app.get("rekening", async (req, res) => {
  const rekening = await Rekening.find({});
  res.render("KelolaUang/rekening/detail", { rekening });
});

app.get("rekening/new", (req, res) => {
  res.render("KelolaUang/rekening/new");
});

app.post("rekening/new", async (req, res) => {
  const nominal = req.body.rekening.nominal;
  let nominalNumber = Number(nominal.replace(/\./g, "")); // hilangkan titik
  req.body.rekening.nominal = nominalNumber;
  const rekening = new Rekening(req.body.rekening);
  await rekening.save();
  res.redirect("/KelolaUang/rekening");
});

// transaksi
app.get("/transaksi", async (req, res) => {
  const transaksi = await Transaksi.find({});
  res.render("KelolaUang/transaksi", { transaksi });
});
