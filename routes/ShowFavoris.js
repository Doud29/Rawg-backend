const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Favoris = require("../Models/Favoris");

router.post("/showfavoris", async (req, res) => {
  try {
    console.log("la route show favoris a été sollicité");
    console.log("showfavoris");
    console.log(req.fields.token);
    const GiveMeUserFavoris = await Favoris.find({
      token: req.fields.token,
    });
    res.json(GiveMeUserFavoris);
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = router;
