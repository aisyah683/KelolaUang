const Rekening = require("../models/rekening");

// Rekening
module.exports.rekDetail = async (req, res) => {
  const rekening = await Rekening.find({});
  res.render("KelolaUang/rekening/detail", { rekening });
};

module.exports.rekNew = (req, res) => {
  res.render("KelolaUang/rekening/new");
};

module.exports.rekSave = async (req, res) => {
  const nominal = req.body.rekening.nominal;
  let nominalNumber = Number(nominal.replace(/\./g, "")); // hilangkan titik
  req.body.rekening.nominal = nominalNumber;
  const rekening = new Rekening(req.body.rekening);
  await rekening.save();
  res.redirect("/KelolaUang/rekening");
};
