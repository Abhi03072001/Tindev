const express = require("express");

const requestsRouter = express.Router();
const ConnectionRequestModel = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");


requestsRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatuses = ['ignored', 'interested'];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({message: "invalid status type" + status}); 
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).send({
                message: "User  not exist"
            });
        }

        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        })

        if (existingConnectionRequest) {
            return res.status(400).send({
                message: "Connection request already exists!!"
            });
        }

        const connectionRequest = new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();

        res.json({
            message: req.user.firstName + " is " + status + "  you",
            data,
        });



    } catch (error) {
        return res.status(400).send("Error sending connection request: " + error.message);
    }
})

requestsRouter.post("/request/review/:status/:requestId", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const { status, requestId } = req.params;

        const allowedStatus = ['accepted', 'rejected'];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "invalid status type" + status });
        }

        const connectionRequest = await ConnectionRequestModel.findOne({
            _id: requestId,
            toUserId: loggedInUser._id,
            status: 'interested'
        });

        if (!connectionRequest) {
            return res.status(404).send({
                message: "Connection request not found or already reviewed"
            });
        }

        connectionRequest.status = status;
        const data = await connectionRequest.save();

        res.json({
            message: loggedInUser.firstName + " has " + status + " the connection request",
            data,
        });

    } catch (error) {
        return res.status(400).send("Error reviewing connection request: " + error.message);
    }   
})

module.exports = requestsRouter;