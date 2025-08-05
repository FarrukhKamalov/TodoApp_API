const mongoose = require("mongoose");


module.exports = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('connect Database');
    }catch(error){
        console.log(error);
    }
}