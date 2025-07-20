const express = require("express");
const router = express.Router();
const Rekening = require("../controllers/rekening");
const tambahData = require("../controllers/tambahData");
const kelolaUang = require("../controllers/kelolaUang");
const user = require("../controllers/user");
const passport = require("passport");
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn } = require("../middleware");

// Home
router.get("/", isLoggedIn, catchAsync(kelolaUang.home));

// transaksi
router.get("/transaksi", isLoggedIn, catchAsync(kelolaUang.transaksi));

// rekening
router.get("/rekening", isLoggedIn, catchAsync(Rekening.rekDetail));
router
  .route("/rekening/new")
  .get(isLoggedIn, catchAsync(Rekening.rekNew))
  .post(isLoggedIn, catchAsync(Rekening.rekSave));
router
  .route("/rekening/:id")
  .put(isLoggedIn, catchAsync(Rekening.rekSaveEdit))
  .delete(isLoggedIn, catchAsync(Rekening.rekDelete));
router.get("/rekening/:id/edit", isLoggedIn, catchAsync(Rekening.rekEdit));

// pemasukan
router.get("/pemasukan", isLoggedIn, catchAsync(tambahData.newPemasukan));
router.post("/pemasukan", isLoggedIn, catchAsync(tambahData.savePemasukan));

// pengeluaran
router.get("/pengeluaran", isLoggedIn, catchAsync(tambahData.newPengeluaran));
router.post("/pengeluaran", isLoggedIn, catchAsync(tambahData.savePengeluaran));

// register
router
  .route("/register")
  .get(user.renderRegister)
  .post(catchAsync(user.register));

// login
router
  .route("/login")
  .get(user.renderLogin)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/KelolaUang/login",
    }),
    user.login
  );

// logout
router.get("/logout", isLoggedIn, user.logout);

module.exports = router;
