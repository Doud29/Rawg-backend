const express = require("express");
const router = express.Router();
const Favoris = require("../Models/Favoris");
const User = require("../Models/User");

router.post("/favoris", async (req, res) => {
  try {
    console.log(req.fields, "donnée utilisateur");
    const newUserFavoris = await User.findOne({
      username: req.fields.profileName,
    });

    if (newUserFavoris) {
      const newfavoris = new Favoris({
        gameName: req.fields.nameGame,
        rating: req.fields.rating,
        image: req.fields.image,
        released: req.fields.released,
        user: newUserFavoris,
      });
      // console.log(newfavoris, "ajout d'un favoris à un user");
      await newfavoris.save();
      res.status(200).json(newfavoris);
    } else {
      res.status(400).json("User introuvable");
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
