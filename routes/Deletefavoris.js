const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Favoris = require("../Models/Favoris");

router.post("/deletefavoris", async (req, res) => {
  try {
    console.log(req.fields);
    const DeleteFavoris = await Favoris.findByIdAndDelete({
      _id: req.fields._id,
    });
    res.json(DeleteFavoris);
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
