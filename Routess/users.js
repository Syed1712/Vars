import express  from "express";
import bcrypt from "bcrypt"
import { addUser, generateToken, getAllUser, getUser } from "../controlers/users.js";
const router=express.Router();


// post Requsest  INsert 


router.post("/singup",async(req,res)=>
{
    try 
    {
        //Salt And Hash     Encryption of Password

        const salt=await bcrypt.genSalt(10);

        const user=await getUser(req.body.email);

        if(!user)    // if the user email was not here add the user 
        {

        
        const hashPassword= await bcrypt.hash(req.body.password,salt)
        console.log("HASH PASSWORD",hashPassword,hashPassword.length)

        const hashedUser=await {...req.body,password:hashPassword}
        const result=await addUser(hashedUser)
         return res.status(200).json({message:"Successfully Signed Up"})


        }
       return res.status(400).json({message:"Given Email Already Exists"})    // if the user email is already here send this message already exists


    }
     catch (error) 
     {
     
        console.log("ERROR OCCURED",error)
       return res.status(500).json({message :"INternal Server Error"})
    }
    
})


// Post Login Details   User Emailis Available

router.post("/login",async(req,res)=>
{
    try 
    {
    
    const user=await getUser(req.body.email);
    if(!user)
    {
       return res.status(404).json({message:"Invalid Email"})
    }
 
    // decrypt and Compare

        const validatePassword=await bcrypt.compare(req.body.password,user.password)
        console.log(validatePassword)

        if(!validatePassword)
        {
            res.status(400).json({message:"Invalid Password"})
            return
        }

        const token=generateToken(user._id);
        return res.status(200).json({message:"Successfully Logged In",token})
       
        }

    catch (error) 
    {
        console.log("ERROR OCCURED",error)
         return res.status(500).json({message :"INternal Server Error"})   
    }
    
})



//Get Request

router.get("/", async (req,res)=>
{
    try 
    {
       
        const result=await getAllUser();
        return res.status(200).json({data:result})     // show all the users login
        
        
    } 
    catch (error) 
    {
        console.log("ERROR OCCURED",error)
       return res.status(500).json({message :"INternal Server Error"})
    }
    

})

export const userRouter=router