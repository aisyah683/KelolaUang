const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

// Dia otomatis menambahkan field pada schema: username, hash, dan salt
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", UserSchema);
