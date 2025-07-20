const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const kelolaUangRoutes = require("./routes/kelolaUang");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const ExpressError = require("./utils/ExpressError");
// const mongoSanitize = require("express-mongo-sanitize");
// const MongoStore = require("connect-mongo");

// koneksi
mongoose
  .connect("mongodb://localhost:27017/KelolaUang")
  .then(() => console.log("KONEKSI KE DATABASE"))
  .catch((e) => console.log("GAGAL KONEKSI KE DATABASE"));

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true })); // untuk ngepost
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

const sessionConfig = {
  name: "session", // Nama cookie yang akan disimpan di browser, default-nya 'connect.sid' tapi diubah agar lebih deskriptif
  secret: "thissecret", // Secret digunakan untuk mengenkripsi/mensign session ID agar tidak mudah dipalsukan
  resave: false, // Jika false, session tidak akan disimpan ulang jika tidak ada perubahan
  saveUninitialized: false, // Jika false, session yang kosong (belum diubah) tidak akan disimpan
  cookie: {
    httpOnly: true, // Cookie hanya bisa diakses lewat HTTP, tidak bisa lewat JavaScript
    // secure: true, // Hanya kirim cookie lewat HTTPS
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // Tanggal kedaluwarsa cookie (dihitung dari saat sekarang + 7 hari ke depan)
    maxAge: 1000 * 60 * 60 * 24 * 7, // Lama cookie akan hidup setelah dibuat (dalam milidetik) — di sini 7 hari
  },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// menggunakan router
app.use("/KelolaUang", kelolaUangRoutes);

// menangani error
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

app.listen(3000, () => {
  console.log("BERADA DI PORT 3000");
});
