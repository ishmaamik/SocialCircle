import User from "../model/User";

export const getUser=async(req, res)=>{
    try{
        const{
            username
        }= req.body;

        const foundUser= await User.findOne({username: username});
        
        if(!foundUser){
            res.status(404).json("User does not exist");
        }

        res.status(200).json(foundUser);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const getUserFriends=async(req, res)=>{
    try{
        const{id}= req.params;
        const user= await User.findOne({_id: id});

        if(!user){
            res.status(404).json("User does not exist");
        }

        const userFriends= await Promise.all(
            user.friends.map((username)=>User.findOne({username}))  //extracts to the username variable the usernames
        )

        res.status(200).json(userFriends);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}