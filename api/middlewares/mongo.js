import mongoose from "mongoose"
const username= process.env.DB_USERNAME
const password= process.env.DB_PASSWORD
const URL= `mongodb+srv://${username}:${password}@cluster0.zc15p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


export const connect=()=>{
    mongoose.connect()
}