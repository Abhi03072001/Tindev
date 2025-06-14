const express = require("express");

const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");


requestsRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;

    console.log("sending a conections request");
    res.send(user.firstname + "sent you a connection request");
})

module.exports = requestsRouter;