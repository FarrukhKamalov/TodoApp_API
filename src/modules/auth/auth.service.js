const userModel = require("../user/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../../utils/generateToken");

const register = async(data) => {
    console.log(data)
    const {username, email, password} = data;

    if(!username || !email || !password) {
        return {
            status: 409,
            message: "Email yoki Parol kiritilmadi.",
            data: {}
        }
    }

    const userExist = await userModel.findOne({email});

    if(userExist) {
        return {
            status: 400,
            message: "Bunday foydalanuvchi tizimda mavjud",
            data: {}
        }
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user =  await userModel.create({
        username,
        email,
        password: passwordHash
    });

    return {
        status: 201,
        message: "User created",
        data: user
    }
}


const login = async(data) => {
    const {email, password} = data;

    if(
        !email || !password) {
        return {
            status: 409,
            message: "Email yoki Parol kiritilmadi.",
            data: {}
        }
    }

    const userExist = await userModel.findOne({email});

    if(!userExist) {
        return {
            status: 404,
            message: "Bunday foydalanuvchi tizimda mavjud emas!",
            data: {}
        }
    }

    const isMatchPassword = await bcrypt.compare(password, userExist.password);

    if(!isMatchPassword) {
        return{
            status: 400,
            message: "Parol noto`g`ri kiritilgan.",
            data: {}
        }
    }
    const token = await generateToken(userExist);
    return {
        status: 200,
        message: "Tizimga muvaffaqiyatli kirdingiz!",
        data: {
            token
        }
    }
}


module.exports = {
    register,
    login
}