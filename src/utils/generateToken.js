const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    try{
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        });

        return token;
    }catch(error){
        console.log(error);
    }
}

module.exports = generateToken;