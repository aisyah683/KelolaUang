const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const rekeningRoutes = require("./routes/rekening");

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

// menggunakan router
app.use("/KelolaUang/rekening", rekeningRoutes);

app.listen(3000, () => {
  console.log("BERADA DI PORT 3000");
});
