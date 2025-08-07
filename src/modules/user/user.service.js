const userModel = require("./user.model");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Foydalanuvchilar bilan ishlash
 */

/**
 * @swagger
 * /api/user/all:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Barcha foydalanuvchilar muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hamma foydalanuvchilar olindi
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       500:
 *         description: Server xatolik yuz berdi
 */

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Mening profilimni olish
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profil muvaffaqiyatli olindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Foydalanuvchi topildi
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       403:
 *         description: Ruxsat yo‘q
 *       404:
 *         description: Foydalanuvchi topilmadi
 *       500:
 *         description: Server xatolik yuz berdi
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64d6e4423cf508d1f47982d9
 *         name:
 *           type: string
 *           example: Farrux
 *         email:
 *           type: string
 *           example: farrux@example.com
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

const getAllUsers = async () => {
    try {
        const users = await userModel.find().select("-password"); 
        return { 
            status: 200,
            message: "Hamma foydalanuvchilar olindi",
            data: users
        };
    } catch (error) {
        return {
            status: 500,
            message: `Xatolik: ${error.message}`,
            data: {}
        };
    }
};


const getProfileMe = async (data) => {
    const { id } = data;

    try {
        const user = await userModel.findById(id).select("-password");
        if (!user) {
            return {
                status: 404,
                message: "Foydalanuvchi topilmadi",
                data: {}
            };
        }

        return {
            status: 200, 
            message: "Foydalanuvchi topildi",
            data: user
        };
    } catch (error) {
        return {
            status: 500,
            message: `Xatolik: ${error.message}`,
            data: {}
        };
    }
};

module.exports = { 
    getAllUsers,
    getProfileMe
};
