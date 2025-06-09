const mongoose = require('mongoose');
const validator = require('validator');
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
       
    },
    lastName: {
        type: String,
       
    },
    email: {
        type: String,
        required : true,
        unique: true,
       validate(value) {
        if(!validator.isEmail(value)) {
            throw new Error("Email is not valid");
       }
    },
},
    password: {
        type: String,
        required: true,
        
    },
    age: {
        type: Number,
        
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "other"].includes(value)) {
                throw new Error("gender data is not valid");
        }

    }, 
},
    photoUrl: {
        type: String,
    },  
    about: {
        type: String,
    },
}, 

{
    timestamps: true,
    
});

const User = mongoose.model('User', UserSchema);
module.exports = User;