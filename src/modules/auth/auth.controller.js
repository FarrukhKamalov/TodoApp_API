const authService = require("./auth.service");


const register = async(req,res) => {
    try{

        console.log(req.body)
        const result = await authService.register(req.body);
        res.status(result.status).json({
            message: result.message,
            data: result.data
        })
    }catch(error){
        console.log(error);
    }
}

const login = async(req,res) => {
    try{
        const result = await authService.login(req.body);
        res.status(result.status).json({
            message: result.message,
            data: result.data
        })
    }catch(error){
        console.log(error);
    }
}

module.exports = {
    register,
    login
}