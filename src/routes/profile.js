const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { validateEditProfileData } = require("../utils/validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
  
  
  const user = req.user;
 
  res.send(user);
} catch (error) {
        res.status(400).send("Error logging in: " + error.message);
    }

});


profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
    if(!validateEditProfileData(req)) {
        return res.status(400).send("Invalid fields in request body");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
        if (req.body[key] !== undefined) {
            loggedInUser[key] = req.body[key];
        }
    });
    await loggedInUser.save();
    res.send(`Profile updated successfully for user: ${loggedInUser.firstName} ${loggedInUser.lastName}`);

    
} catch (error) {
        return res.status(400).send("Error validating request body: " + error.message);
    }
})


module.exports = profileRouter;