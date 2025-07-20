const Transaksi = require("./models/rekening");
const Rekening = require("./models/rekening");

// untuk memastikan sudah login atau ga
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl; // add this line
    req.flash("error", "You must be signed in first!");
    return res.redirect("/KelolaUang/login");
  }
  next();
};
