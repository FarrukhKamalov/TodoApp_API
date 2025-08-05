const userModel = require("./user.model");

const getAllUsers = async(data)=>{
    const users = await userModel.find();

    return { 
        status: 200,
        message: "Hamma userlar olindi",
        data: users
    }
}

const GetProfileMe = async(data)=>{
    const 
}