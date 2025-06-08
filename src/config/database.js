const mongoose = require('mongoose');



const connectdb = async ()=> {
    await mongoose.connect('mongodb+srv://LearnMongo:Abhi%40123@learnmongo.acfngt4.mongodb.net/Tindev'); 
};

module.exports = connectdb;

