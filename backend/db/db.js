const mongoose = require('mongoose');
require('dotenv').config(); // Ensure this is at the very top of your entry file


const db = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database");
    }catch(error){
        console.log("Database connection error");
    }
}

module.exports = {db};