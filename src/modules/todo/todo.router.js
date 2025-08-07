const { isAuth } = require("../../middlewares/isAuth");
const todoController = require("./todo.controller");

const router = require("express").Router();


router.get("/", isAuth, todoController.getTodos);
router.get("/:id", isAuth, todoController.getTodoById);
router.post("/", isAuth, todoController.createTodo);
router.patch("/:id", isAuth, todoController.updateTodo);
router.delete('/:id', isAuth, todoController.deleteTodo);


module.exports = router;