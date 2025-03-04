import {userModel} from "../models/User.js"

export const addUser=async(req, res)=>{
   
    try{
        console.log("Received data:", req.body);
        const {firstName, lastName, email, password}= req.body;
        const userDb= new userModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })


        await userDb.save();
        console.log("Saved data:", userDb);
        res.status(201).json({ message: "User created successfully"});
    }
    catch(error){
        res.status(400).json(error);
    }


}

export const getUser=async(req, res)=>{
    try{
        const {firstName, lastName, email, password}= req.body;
        const user= await userModel.findOne({userId: userId})
    }

    catch(error){
        res.send(error)
    }
}