const Rekening = require("../models/rekening");

// Rekening
module.exports.rekDetail = async (req, res) => {
  const rekening = await Rekening.find({});
  res.render("KelolaUang/rekening/detail", { rekening });
};

// new
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

// edit
module.exports.rekEdit = async (req, res) => {
  const { id } = req.params;
  const rekening = await Rekening.findById(id);
  res.render("KelolaUang/rekening/edit", { rekening });
};

module.exports.rekSaveEdit = async (req, res) => {
  const nominal = req.body.rekening.nominal;
  let nominalNumber = Number(nominal.replace(/\./g, "")); // hilangkan titik
  req.body.rekening.nominal = nominalNumber;
  const { id } = req.params;
  await Rekening.findByIdAndUpdate(id, {
    ...req.body.rekening,
  });
  res.redirect("/KelolaUang/rekening");
};

module.exports.rekDelete = async (req, res) => {
  const { id } = req.params;
  await Rekening.findByIdAndDelete(id);
  res.redirect("/KelolaUang/rekening");
};
