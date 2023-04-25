import { client } from "../db.js"
import { ObjectId } from "../db.js"
import  jwt  from "jsonwebtoken"

export function addUser(userDetails)
{
    return client
    .db("Nodejs")
    .collection("users")
    .insertOne(userDetails)
}

export function getUser(useEmail)
{
    return client
    .db("Nodejs")
    .collection("users")
    .findOne({email :useEmail})
}

export function getAllUser()
{
    return client
    .db("Nodejs")
    .collection("users")
    .find()
    .toArray()
}



export function generateToken(id)
{
    return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:"30d"})
}