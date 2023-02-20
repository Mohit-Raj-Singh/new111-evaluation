const express = require("express");
require("dotenv").config();
const cors=require("cors");
const { userRouter } = require("./routes/userRoute");
const { connection } = require("./config/db");
const { authentication } = require("./middlewares/authentication");
const { postRouter } = require("./routes/postRoutes");


const app=express();
app.use(cors({
    origin:"*"
}));

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("HomePage");
});

app.use("/users",userRouter);
app.use(authentication);
app.use("/posts",postRouter);



app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("Connected to DB");
    }
    catch(err){
        console.log("Error in Server");
        console.log(err);
    }
    console.log(`Server is running on ${process.env.port}`);
})