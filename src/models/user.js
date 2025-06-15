const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
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
    skills: {
        type: [String],
    },
}, 

{
    timestamps: true,
    
});

userSchema.methods.getJWT = async function (){
    const user = this;

    const token = await jwt.sign({ userId: user._id }, "your_jwt_secret", {
        expiresIn: '7d',
    });
    return token;
}

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
        
}


const User = mongoose.model('User', userSchema);
module.exports = User;