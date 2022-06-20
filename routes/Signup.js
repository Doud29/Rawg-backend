const express = require("express");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const User = require("../Models/User");
const router = express.Router();

cloudinary.config({
  cloud_name: "le-r-acteur",
  api_key: "927477243267287",
  api_secret: "KvTumojz0oud0xPSDAtK2Ev7a_I",
});

//--------------------------------------------------------//
//---------------------- // SignUp // --------------------//
//--------------------------------------------------------//

router.post("/SignUp", async (req, res) => {
  try {
    const { password, email, username } = req.fields;
    // console.log("données utilisateur", req.fields);
    console.log("photo utilisateur", req.files);

    const IsUserexisting = await User.findOne({ email: email });

    const avatarToUpload = req.files.avatar.path;
    const result = await cloudinary.uploader.upload(avatarToUpload);
    // return res.json(result);

    if (IsUserexisting !== null) {
      return res.json("cet email exitse déjà, vous devez le changer");
    } else {
      const salt = uid2(64);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(64);

      const newUser = new User({
        username: username,
        email: email,
        token: token,
        hash: hash,
        salt: salt,
        avatar: result.secure_url,
      });
      await newUser.save();
      return res.json({
        username: username,
        email: email,
        token: token,
        avatar: result.secure_url,
      });
    }
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = router;
