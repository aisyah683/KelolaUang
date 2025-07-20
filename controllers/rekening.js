const Rekening = require("../models/rekening");

// Rekening
module.exports.rekDetail = async (req, res) => {
  const rekening = await Rekening.find({ author: req.user._id });
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
  rekening.author = req.user._id;
  await rekening.save();
  req.flash("success", `${rekening.nama} Berhasil Disimpan`);
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
  const rekening = await Rekening.findByIdAndUpdate(id, {
    ...req.body.rekening,
  });
  req.flash("success", `${rekening.nama} Berhasil Diupdate`);
  res.redirect("/KelolaUang/rekening");
};

module.exports.rekDelete = async (req, res) => {
  const { id } = req.params;
  const rekening = await Rekening.findByIdAndDelete(id);
  req.flash("error", `${rekening.nama} Berhasil Dihapus`);
  res.redirect("/KelolaUang/rekening");
};
