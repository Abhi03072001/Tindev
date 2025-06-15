const validator = require('validator');

const validateSignupData = (req) =>{
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        throw new Error("All fields are required");
    } else if (!validator.isEmail(email)) {
        throw new Error("Email is not valid");
    }  else if (!validator.isStrongPassword(password, { minLength: 8 })) {
        throw new Error("Password must be at least 8 characters long and contain a mix of letters, numbers, and symbols");
    }
}


const validateEditProfileData = (req) => {
    const allowedEditFields =  ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"];

    const isAllowedField = Object.keys(req.body).every((field) => allowedEditFields.includes(field));

    return isAllowedField;
}


module.exports = {validateSignupData, validateEditProfileData}; 