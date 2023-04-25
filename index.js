import  express  from "express";                          //const express=require("express")
const app=express();
import path from "path";                                  //const path=require("path")
import dotenv from "dotenv"
import { studentsRouter } from "./Routess/students.js";
import cors from "cors"
import { userRouter } from "./Routess/users.js";

//ENV CONGIGRATION
dotenv.config()

const port= process.env.port;

//MIDDLEWARES
app.use(express.static("NewFolder"));                       // Loading the Static File   //to define the folder
app.use(express.json())                                     // middle ware its tell server to use json
app.use(cors())

app.get("/static",(req,res)=>{
    res.sendFile(path.join(__dirname,"NewFolder/Express.txt"))
})


app.get("/",(req,res)=>
{
    res.send("HELLO THIS IS YOUR RESPONSE")
})


app.use("/students",studentsRouter)
app.use("/users",userRouter)

// 1. Start  The Server--HTTP SERVER INITIALIZATION
app.listen(port,()=>console.log("SERVER STARTED Locallhost"))