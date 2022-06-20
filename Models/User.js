//-----------------------------------------------------------------------//
//------------------// MODEL pour la base de données //------------------//
//-----------------------------------------------------------------------//

const mongoose = require("mongoose");

const User = mongoose.model("User", {
  username: { type: String, required: true },
  email: { type: String, required: true },
  token: { type: String, required: true },
  hash: { type: String, required: true },
  salt: { type: String, required: true },
  avatar: { type: String, required: true },
  favoris: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Favoris",
  },
});

module.exports = User;
