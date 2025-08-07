const todoService = require("./todo.service");


const getTodos = async(req,res) => {
    try{
        const result = await todoService.getTodos(req);

        res.status(result.status).json({
            message: result.message,
            data: result.data
        })
    }catch(error){
        res.status(500).json({
            message: error.message,
            data: {}
        })
    }
}


const createTodo = async(req,res)=>{
    try{
        const result = await todoService.createTodo(req);

        res.status(result.status).json({
            message: result.message,
            data: result.data
        })
    }catch(error){
        res.status(500).json({
            message: error.message,
            data: {}
        })
    }
}


const updateTodo = async(req,res)=>{
    try{
        const result = await todoService.updateTodo(req);

        res.status(result.status).json({
            message: result.message,
            data: result.data
        })
    }catch(error){
        res.status(500).json({
            message: error.message,
            data: {}
        })
    }
}


const deleteTodo = async (req, res) => {
    try{
        const result = await todoService.deleteTodo(req);
        res.status(result.status).json({
            message: result.message,
            data: result.data
        });
    }catch(error){
        res.status(500).json({
            message: error.message,
            data: {}
        })
    }
};


const getTodoById = async(req,res)=>{
    try{
        const result = await todoService.getTodoById(req);

        res.status(result.status).json({
            message: result.message,
            data: result.data
        })
    }catch(error){
        res.status(500).json({
            message: error.message,
            data: {}
        })
    }
}



module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getTodoById
}