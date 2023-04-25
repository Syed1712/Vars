import { client } from "../db.js"
import { ObjectId } from "../db.js"

//Query
export function getStudents(req)
{
    return client
    .db("Nodejs")
    .collection("stud")
    .find(req.query)
    .toArray()
}

//Params
export function getParams(id)
{
  return  client
    .db("Nodejs")
    .collection("stud")
    .findOne({_id : new ObjectId(id)})
}

//Post InsertOne
export function addStudents(newData)
{
     return client
    .db("Nodejs")
    .collection("stud")
    .insertOne(newData)
}

//Put UpdateOne
export function updateStudents(id,updateData)
{
    return client   
    .db("Nodejs")
    .collection("stud")
    .updateOne({_id: new ObjectId(id)},{$set:updateData})
}

//Delete Student
export function deleteStudents(id)
{
    return client
    .db("Nodejs")
    .collection("stud")
    .deleteOne({_id : new ObjectId(id)})
}

//Insert Many PostMAny

export function insertMany(addmany)
{
    return client
    .db("Nodejs")
    .collection("stud")
    .insertMany(addmany)
}
