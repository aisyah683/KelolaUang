const nominal = document.getElementById("nominal");

nominal.addEventListener("input", function (e) {
  // Menghapus semua karakter kecuali angka, e.target.value(input yang lagi diketik), \D(semua non-angka), g(hilangkan non-angka)
  let value = e.target.value.replace(/\D/g, "");
  // mengubah nilai input sesuai format
  e.target.value = new Intl.NumberFormat("id-ID").format(value);
});

const el = document.getElementById("tgl");
el.value = new Date().toISOString().slice(0, 10);
