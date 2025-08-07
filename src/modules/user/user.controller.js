const userService = require("./user.service");


const getAllUsers = async(req,res)=>{
    try{
        const result = await userService.getAllUsers();
        res.status(result.status).json({
            message: result.message,
            data: result.data
        });
    }catch(error){
        res.status(500).json({
            message: "error: " + error.message,
            data: {}
        })
    }
}

const getProfileMe = async(req,res) => {
    try{
        const user = req.user;
        const result = await userService.getProfileMe(user);
        res.status(result.status).json({
            message: result.message,
            data: result.data
        });
    }catch(error){
        res.status(500).json({
            message: "error: " + error.message,
            data: {}
        })
    }
}



module.exports = {
    getAllUsers,
    getProfileMe
}