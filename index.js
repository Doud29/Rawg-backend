//--------------------------------------------------------//
//---------------------- // Packages // ------------------//
//--------------------------------------------------------//
const dotenv = require("dotenv").config();
const express = require("express");
const formidableMiddleware = require("express-formidable");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const formidable = require("express-formidable");
app.use(formidable());
app.use(cors());
app.use(formidableMiddleware());

//--------------------// Mongoose //----------------------//

//ici ===> connexion à mongoose pour sauvegarder un User
mongoose.connect("mongodb://localhost:27017/rawg");

//--------------------------------------------------------//
//----------------------- // Routes // -------------------//
//--------------------------------------------------------//

//--------------------------- Home -----------------------//

// const Homeroute = require("./routes/Home");
// app.use(Homeroute);

// --------------------------- Login ----------------------//

const Loginroute = require("./routes/login");
app.use(Loginroute);

//------------------------------ Signup -----------------------//

const Signuproute = require("./routes/SignUp");
app.use(Signuproute);

//----------------------------- Favoris -----------------------//

const Favorisroute = require("./routes/favoris");
app.use(Favorisroute);

//---------------------------- showfavoris ---------------------//

const FavorisGetroute = require("./routes/showfavoris");
app.use(FavorisGetroute);

//--------------------------- deletefavoris --------------------//

const FavorisDeleteroute = require("./routes/deletefavoris");
app.use(FavorisDeleteroute);

//----------------- // gestion des erreurs // ------------//

app.all("*", (req, res) => {
  res.status(404).send("Page introuvable");
});

//----------------- // Lancement du serveur // -------------//

app.listen(4000, () => {
  console.log("Serveur en cours de fonctionnement");
});
