const todoModel = require("./todo.model");
/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo larni boshqarish (JWT bilan himoyalangan)
 */




/**
 * @swagger
 * /api/todo:
 *   get:
 *     summary: Foydalanuvchining barcha todolarini olish
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Todo bajarilganmi yoki yo'q
 *       - in: query
 *         name: dueBefore
 *         schema:
 *           type: string
 *           format: date
 *         description: Shu sanagacha deadline
 *       - in: query
 *         name: dueAfter
 *         schema:
 *           type: string
 *           format: date
 *         description: Shu sanadan keyingi deadline
 *     responses:
 *       200:
 *         description: Todolar ro'yxati
 */
const getTodos = async (data) => {
  const { completed, dueBefore, dueAfter } = data.query;
  const filter = { user: data.user.id };

  if (completed !== undefined) {
    filter.completed = completed === "true";
  }

  if (dueBefore) {
    filter.dueDate = { ...filter.dueDate, $lte: new Date(dueBefore) };
  }

  if (dueAfter) {
    filter.dueDate = { ...filter.dueDate, $gte: new Date(dueAfter) };
  }

  try {
    const todos = await todoModel.find(filter).sort({ dueDate: 1 });
    return {
      status: 200,
      message: "Todolar olindi",
      data: {
        todos,
      },
    };
  } catch (error) {
    return {
      status: 500,
      message: `Todolar olinishida xatolik: ${error.message}`,
      data: {},
    };
  }
};

/**
 * @swagger
 * /api/todo/{id}:
 *   get:
 *     summary: Bitta todo ni ID orqali olish
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Topilgan todo
 *       403:
 *         description: Ruxsat yo'q
 *       404:
 *         description: Todo topilmadi
 */


const getTodoById = async (data) => {
    const { id } = data.params;
    const user = data.user.id;

    try {
        const todoExist = await todoModel.findById(id);

        if (!todoExist) {
            return {
                status: 404,
                message: "Todo topilmadi.",
                data: {}
            };
        }

        if (user !== todoExist.user.toString()) {
            return {
                status: 403,
                message: "Todoni faqat egasi ko'ra oladi.",
                data: {}
            };
        }

        return {
            status: 200,
            message: "Todo topildi.",
            data: { todo: todoExist }
        };

    } catch (error) {
        return {
            status: 500,
            message: `Todo olishda xatolik: ${error.message}`,
            data: {}
        };
    }
};

/**
 * @swagger
 * /api/todo:
 *   post:
 *     summary: Yangi todo yaratish
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Kitob o'qish"
 *               description:
 *                 type: string
 *                 example: "Har kuni 30 daqiqa"
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-08-10"
 *               completed:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Todo yaratildi
 */

const createTodo = async (data) => {
  const { title, description, dueDate, completed } = data.body;
  const user = data.user;
  try {
    const todo = await todoModel.create({
      title,
      description,
      dueDate,
      completed,
      user: user.id,
    });

    return {
      status: 201,
      message: "Todo yaratildi",
      data: { todo },
    };
  } catch (error) {
    return {
      status: 500,
      message: `Todo yaratishda xatolik: ${error.message}`,
      data: {},
    };
  }
};


/**
 * @swagger
 * /api/todo/{id}:
 *   patch:
 *     summary: Mavjud todo ni tahrirlash
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Yangi nom"
 *               description:
 *                 type: string
 *                 example: "Yangi izoh"
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Todo muvaffaqiyatli tahrirlandi
 *       403:
 *         description: Egasi emas
 *       404:
 *         description: Todo topilmadi
 */

const updateTodo = async (data) => {
  const { title, description, completed } = data.body;
  const { id } = data.params;
  const userId = data.user.id;

  const todoExist = await todoModel.findById(id);
  if (!todoExist) {
    return {
      status: 404,
      message: "Todo topilmadi",
      data: {},
    };
  }

  if (todoExist.user.toString() !== userId) {
    return {
      status: 403,
      message: "Faqat todo egasi o'zgartira oladi. Siz egasi emassiz.",
      data: {},
    };
  }

  try {
    todoExist.title = title ?? todoExist.title;
    todoExist.description = description ?? todoExist.description;
    todoExist.completed = completed ?? todoExist.completed;

    const updated = await todoExist.save();

    return {
      status: 200,
      message: "Todo muvaffaqiyatli tahrirlandi",
      data: { todo: updated },
    };
  } catch (error) {
    return {
      status: 500,
      message: `Todo tahrirlashda xatolik: ${error.message}`,
      data: {},
    };
  }
};


/**
 * @swagger
 * /api/todo/{id}:
 *   delete:
 *     summary: Todoni o'chirish
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo o'chirildi
 *       403:
 *         description: Egasi emas
 *       404:
 *         description: Todo topilmadi
 */

const deleteTodo = async (data) => {
  const { id } = data.params;
  const user = data.user.id;

  const todoExist = await todoModel.findById(id);
  if (!todoExist) {
    return {
      status: 404,
      message: "Todo topilmadi.",
      data: {},
    };
  }
  if (todoExist.user.toString() !== user)
    return {
      status: 403,
      message: "Faqat todo egasi o'chira oladi. Siz egasi emassiz.",
      data: {},
    };

  try {
    await todoExist.deleteOne();
    return {
      status: 200,
      message: "Todo o'chirildi.",
      data: {},
    };
  } catch (error) {
    return {
      status: 500,
      message: `Todo o'chirishda xatolik: ${error.message}`,
      data: {},
    };
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getTodoById
};
