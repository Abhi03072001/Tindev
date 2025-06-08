const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
       
    },
    lastName: {
        type: String,
       
    },
    email: {
        type: String,
       
    },
    password: {
        type: String,
        
    },
    age: {
        type: Number,
        
    },
    gender: {
        type: String,
    },   
});

const User = mongoose.model('User', UserSchema);
module.exports = User;