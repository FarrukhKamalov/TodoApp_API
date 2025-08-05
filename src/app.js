require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const authRouter = require("./modules/auth/auth.router");
const connectDB = require("./utils/connectDB")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors('*'));
app.use(morgan("dev"));

const baseURL = '/api'
app.use(`${baseURL}/auth`, authRouter);



app.get("/health", (req,res)=> {
    res.json({
        message: "here we go"
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, async()=> {
    await connectDB()
    console.log(`SERVER LISTENER: ${PORT}`);
})



