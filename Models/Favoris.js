//-----------------------------------------------------------------------//
//------------------// MODEL pour la base de données //------------------//
//-----------------------------------------------------------------------//

const mongoose = require("mongoose");

const Favoris = mongoose.model("favoris", {
  gameName: { type: String, required: true },
  rating: { type: String, required: true },
  image: { type: String, required: true },
  released: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favoris;
