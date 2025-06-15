const express = require('express');
const { validateSignupData } = require("../utils/validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();


authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);

    const { firstName, lastName, email, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({ firstName, lastName, email, password: passwordHash });
    await user.save();
    res.send("User created successfully");
  } catch (error) {
    res.status(400).send("Error creating user: " + error.message);
  }
});


authRouter.post("/login", async (req, res) => {
    
    try {

        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).send("User not found");
        } 
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {

          // Generate JWT token
            const token = await user.getJWT();
            

            // add token to cookies and send the response back to the  user
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
            });
          console.log(user);
            res.send("Login successful");
        } else {
            throw new Error("Invalid password");
        }


    } catch (error) {
        res.status(400).send("Error logging in: " + error.message);
    }
})

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("logout successful");
})

module.exports = authRouter;