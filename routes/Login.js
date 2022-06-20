//--------------------------------------------------------//
//---------------------- // Login  // --------------------//
//--------------------------------------------------------//

const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../Models/User");

router.post("/login", async (req, res) => {
  try {
    const { password, email } = req.fields;

    const Isaccountexisting = await User.findOne({ email: email });

    if (Isaccountexisting) {
      const newHash = SHA256(password + Isaccountexisting.salt).toString(
        encBase64
      );

      if (newHash === Isaccountexisting.hash) {
        return res.status(200).json({
          _id: Isaccountexisting._id,
          username: Isaccountexisting.username,
          email: Isaccountexisting.email,
          token: Isaccountexisting.token,
          avatar: Isaccountexisting.avatar,
        });
      } else {
        res.status(400).json("compte introuvable");
      }
    } else {
      res.status(400).json("compte inexistant");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
