import mongoose from "mongoose"
import bcrypt from "bcryptjs"
const userSchema= new mongoose.Schema({   
    googleId:{
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password:{
        type: String
    },
    

})

userSchema.pre("save", async function(next){
    const user= this;

    if(!user.isModified('password')){
        return next()
    }

    try{
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(user.password, salt);

        user.password= hashedPassword;
    }
    catch(error){
        console.log(error);
    }
})

export const userModel= mongoose.model("User", userSchema);