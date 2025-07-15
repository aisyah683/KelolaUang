// pemasukan
app.get("/pemasukan", (req, res) => {
  res.render("KelolaUang/tambah/pemasukan");
});
app.post("/pemasukan", async (req, res) => {
  const transaksi = new Transaksi(req.body.transaksi);
  await transaksi.save();
  res.redirect("/KelolaUang");
});

// pengeluaran
app.get("/pengeluaran", (req, res) => {
  res.render("KelolaUang/tambah/pengeluaran");
});
app.post("/pengeluaran", async (req, res) => {
  const transaksi = new Transaksi(req.body.transaksi);
  await transaksi.save();
  res.redirect("/KelolaUang");
});
