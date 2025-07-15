const express = require("express");
const router = express.Router();
const Rekening = require("../controllers/rekening");

// rekening
router.get("/", Rekening.rekDetail);

router.get("/new", Rekening.rekNew);

router.post("/new", Rekening.rekSave);
