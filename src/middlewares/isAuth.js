const jwt = require("jsonwebtoken");



const isAuth = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            message: "token yoq",
            data: {}
        })
    }

    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    }catch(error){
        return res.status(401).json({
            message: "token yaroqsiz",
            data: {}
        })
    }
}

const isAdmin = (req,res, next) => {
    if(!req.user || req.user.role !== "admin"){
        return res.status(403).json({
            message: "Faqat adminlar uchun",
            data: {}
        })
    }

    next()
}


module.exports = {
    isAdmin,
    isAuth
}