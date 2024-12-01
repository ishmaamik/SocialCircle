import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";
import dotenv from "dotenv";
dotenv.config();
export const register= async(req, res)=>{   //since we are calling to mongodb we need async function that waits for data from server

    try{
        
        const picturePaths= req.file? req.file.originalname: "";

        const{
            firstName,
            lastName,
            username,
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
            username,
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


export const login= async(req, res)=>{
    try{
        const{
            username,
            password
        }= req.body;

        const loggedUser= await User.findOne({username: username})

        if(!loggedUser){
            res.status(400).json({message: "User does not exist"});
        }

        const isMatch= await bcrypt.compare(password, loggedUser.password);
        if(!isMatch){
            res.status(400).json({message: "Invalid credentials"});
        }

        const token= jwt.sign({id: loggedUser._id}, process.env.JWT_SECRET);
        delete loggedUser.password; //to prevent the user password being printed
         res.status(200).json(loggedUser);
        

    }
    catch(err){
        res.status(500).json(err.message);
    }
}