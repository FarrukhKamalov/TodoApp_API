const {isAdmin, isAuth} = require("../../middlewares/isAuth");
const userController = require("./user.controller");
const router = require("express").Router();


router.get("/all", isAuth, isAdmin, userController.getAllUsers);
router.get("/me", isAuth, userController.getProfileMe);

module.exports = router;