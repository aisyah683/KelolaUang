const express = require("express");
const router = express.Router();
const Rekening = require("../controllers/rekening");
const tambahData = require("../controllers/tambahData");
const kelolaUang = require("../controllers/kelolaUang");

// Home
router.get("/", kelolaUang.home);

// transaksi
router.get("/transaksi", kelolaUang.transaksi);

// rekening
router.get("/rekening", Rekening.rekDetail);
router.route("/rekening/new").get(Rekening.rekNew).post(Rekening.rekSave);
router
  .route("/rekening/:id")
  .put(Rekening.rekSaveEdit)
  .delete(Rekening.rekDelete);
router.get("/rekening/:id/edit", Rekening.rekEdit);

// pemasukan
router.get("/pemasukan", tambahData.newPemasukan);
router.post("/pemasukan", tambahData.savePemasukan);

// pengeluaran
router.get("/pengeluaran", tambahData.newPengeluaran);
router.post("/pengeluaran", tambahData.savePengeluaran);

module.exports = router;
