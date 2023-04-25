import { MongoClient } from "mongodb";                    //const { MongoClient } = require("mongodb");
import Obj from "mongodb";                                //const ObjectId= require("mongodb").ObjectId;

//ENV CONFIGRATIONS
import dotenv from "dotenv"
dotenv.config()


//Mongo Db Connection
const MONGO_URL = process.env.MONGO_URL
async function createConnection()
{
const client = new MongoClient(MONGO_URL);
await client.connect();
console.log("Mongo DB CONNECted Successfully")
return client
}

export var ObjectId=Obj.ObjectId;
export const client= await createConnection()