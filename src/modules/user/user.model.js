const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    username: {
        type: String,
        default: "John Doe",
    },
    password: {
        type: String,
        required: true,
    }
}, {timestamps: true});


module.exports  = mongoose.model("User", userSchema);