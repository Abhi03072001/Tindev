const express = require('express');
const connectdb = require('./config/database');
const app = express();
const User = require('./models/user');


app.post('/signup', async (req, res) => {
    const user = new User({
        firstName: "John",
        lastName: "Doe",
        email: "john@doe.com",
        password: "password123",
    })

    try {
    await user.save();
    res.send("User created successfully");
    } catch (error) {
        res.status(400).send("Error creating user: " + error.message);
    }   
})

connectdb().then(() =>{
    console.log("Database connected successfully");
    app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
}); 
}).catch((err) => {
    console.error("Database connection failed", err);
});



