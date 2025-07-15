const mongoose = require("mongoose");
const transaksi = require("./transaksi");
const transaksiModel = require("../models/transaksi");

// koneksi
mongoose
  .connect("mongodb://localhost:27017/KelolaUang")
  .then(() => console.log("KONEKSI KE DATABASE"))
  .catch((e) => console.log("GAGAL KONEKSI KE DATABASE"));

const seedDB = async () => {
  await transaksiModel.deleteMany({});
  for (let isi of transaksi) {
    const addTransaksi = new transaksiModel({
      tanggal: isi["tanggal"],
      jenis: isi["jenis"],
      kategori: isi["kategori"],
      keterangan: isi["keterangan"],
      nominal: isi["nominal"],
    });
    await addTransaksi.save();
  }
};

seedDB().then(() => mongoose.connection.close());
