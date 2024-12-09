import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken=async(req, res, next)=>{
    try{
       let token= req.header("Authorization");  //let otherwise token can't be changed down the line

       if(!token){
        res.status(403).send("Access denied");
       }

       if(token.startsWith("Bearer ")){
        token= token.slice(7, token.length).trimLeft();
       }

       const verified= jwt.verify(token, process.env.JWT_SECRET);
       req.user= verified;
       next();
    }
    catch(err){
        res.status(500).json(err.message);
    }
}