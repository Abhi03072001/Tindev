const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Assuming you have a User model defined
const userAuth = async (req, res, next) => {
   try {
        // read the token from the request cookies
    const { token } = req.cookies;
    if (!token) {
        throw new Error('No token provided');
    }

    //validate the token
    const decodedToken = await jwt.verify(token, 'your_jwt_secret');
    const { userId } = decodedToken;
    //find thr user
    const user = await User.findById(userId);
    console.log("User found:", user);
    if (!user) {
        throw new Error('User not found');
    } 
    req.user = user; // Attach user to request object
    next();
} catch (error) {
    res.status(401).send("Unauthorized: " + error.message);
  }
}

module.exports = {
    userAuth,
};