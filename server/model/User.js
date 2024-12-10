import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema= new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        max: 20,
        min: 5
    },
    lastName:{
        type: String,
        required: true,
        max: 20,
        min: 5
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
        min: 5
    },
    friends:{
        type: Array,
        default: []
    },
    picturePath:{
        type: String,
        default: ""
    },
    location: String,
    occupation:  String
},
{timestamps: true});

userSchema.pre("save", async function(req, res, next){
    const user= this;

    if(!user.isModified('password')){   //if password is not changed then go to next
       return next()
    }

    try{
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(user.password, salt);

        user.password= hashedPassword;
    }
    catch(err){
        res.status(500).json({error: err.message});
    }


})

const User= mongoose.model("User", userSchema);
export default User;