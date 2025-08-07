const authService = require("./auth.service");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Ro'yxatdan o'tish va tizimga kirish
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Ro'yxatdan o'tish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username: 
 *                  type: string
 *                  example: john  
 *               email:
 *                 type: string
 *                 example: farrux@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       201:
 *         description: Muvaffaqiyatli ro'yxatdan o'tdi
 *       400:
 *         description: Noto‘g‘ri ma’lumotlar
 *       500:
 *         description: Serverda xatolik
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Tizimga kirish
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: farrux@example.com
 *               password:
 *                 type: string
 *                 example: 12345678
 *     responses:
 *       200:
 *         description: Muvaffaqiyatli tizimga kirdi
 *       401:
 *         description: Login yoki parol noto‘g‘ri
 *       500:
 *         description: Serverda xatolik
 */

const register = async(req,res) => {
    try{
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