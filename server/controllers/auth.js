import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../model/User.js"

export const register= async(req, res)=>{   //since we are calling to mongodb we need async function that waits for data from server

    try{
        
        const picturePaths= req.file? req.file.originalname: "";

        const{
            firstName,
            lastName,
            email,
            password,
            friends,
            picturePath,
            location,
            occupation
        }= req.body;

        const newUser= new User({
            firstName,
            lastName,
            email,
            password,
            friends,
            picturePath: picturePaths,
            location,
            occupation
        })

        // const newUser= new User(req.body);  //if already as it is should be
        const savedUser= await newUser.save();
        res.status(201).json(savedUser);    //checks whether the object savedUser returns a 201 status

    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}