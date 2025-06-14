const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
  
  
  const user = req.user;
 
  res.send(user);
} catch (error) {
        res.status(400).send("Error logging in: " + error.message);
    }

});



module.exports = profileRouter;