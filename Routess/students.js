import { client } from "../db.js";
import express  from "express";
import { ObjectId } from "../db.js";
import  jwt  from "jsonwebtoken"

import { addStudents, deleteStudents, getParams, getStudents, insertMany, updateStudents } from "../controlers/students.js";
const router=express.Router();



//Mongo DB Parameter function


router.get("/:id", async (req,res)=>
{
    const {id}=req.params;
    
    try {

        const studentPara= await getParams(id)
        
        if(!studentPara) return res.status(400).send({data :"USER NOT FOUND"})
   
        res.status(200).json({data:studentPara})
   
    } 
    catch (error) 
         {
        console.log(error)

        res.status(500).send({data: "INTERNAL SERVER ERROR"})
    }
    
})

//MongoDb Query Function
router.get("/",async(req,res)=>
{
    //Query Condition
    if(req.query.Age)
    {
        req.query.Age=+req.query.Age
    }
 try {


    //Token

    // const token=req.headers["x-auth-token"];
    // console.log(token)
    // jwt.verify(token,process.env.SECRET_KEY)

    
    // Data Retrival From Database

    const allStudent= await getStudents(req)

    if(allStudent.length<=0)
         {
        res.status(404).json({data:"NO CONTENT AVAILABLE"})
        return
     }
     
     res.status(200).json({data: allStudent})
        
 }
  catch (error) {
    
    console.log("ERROR :",error)

    res.status(500).json({data :"INTERNAL SERVER "})
 }

})


// Mongo DB Post Method

router.post("/", async (req,res)=>
{
   
  
    try {
        const newData=req.body;
        if(!newData)
        {
            return  res.status(404).json({data :"NO DATA PROVIDED"})
            
        }
        const result=await addStudents(newData)
        res.status(201).json({data:"DATA ADDED SUCCESSFULLY"}) 
   } 

    catch (error) 
    {
    
        console.log("ERROR : ",error)        
        res.status(500).json({data :"INTERNAL SERVER ERROR"})
    
    }
    
})

//Get All Students MONGODB
// router.get("/all/Students",async (req,res)=>
// {
//  const allStudent= await client
//  .db("Nodejs")
//  .collection("stud")
//  .find()
//  .toArray()
//  res.send(allStudent)
// })

//Mongo DB Put Method

router.put("/:id",async(req,res)=>
{
    const {id}=req.params
    
    try {
        const updateData=req.body
        if(!updateData)
        {
            res.status(400).json({data :"NO DATA PROVIDED"})
            return
        }
        const result=await updateStudents(id,updateData)
        res.status(201).json({data:"DATA EDITED SUCCESSFULLY"})
    }

     catch (error) {
        console.log("ERROR :",error)
        res.status(500).json({data :"INTERNAL SERVER ERROR"})
    }
    
})


// Mongo DB Delete Method
router.delete("/:id", async(req,res)=>
{
    const {id}=req.params

    try {
        const result=await deleteStudents(id)
        res.status(201).json({data :"DATA DELETED SUCCESSFULLY"})
    } 

    catch (error) {
        console.log("ERROR :",error)
        res.status(500).json({data :"INTERNAL SERVER ERROR"})
    }
    
})


// Insert Many MOngoDB
router.post("/many",async(req,res)=>
{
    const addmany=req.body;

    try {
        if(addmany.length<=0)
        {
            res.status(200).json({data:"NO CONTENT PROVIDED"})
            return
        }
        const result=await insertMany(addmany)
        res.status(201).json({data:"MANY ITEMS ADDED SUCCESSFULLY"})    
    } 
    
    catch (error) {
        console.log("ERROR :",error)
        res.status(500).json({data :"INTERNAL SERVER ERROR"})
    }
    

})


 export const studentsRouter=router