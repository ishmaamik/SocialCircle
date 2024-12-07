import User from "../model/User.js";

export const getUser=async(req, res)=>{
    try{
        const{
            username
        }= req.params;

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
        const{userName}= req.params;
        const user= await User.findOne({username: userName});

        if(!user){
            res.status(404).json("User does not exist");
        }

        const userFriends= await Promise.all(
            user.friends.map((userName)=>User.findOne({userName}))  //extracts to the username variable the usernames
        )
        
        const formattedFriends= userFriends.map(
            ({userName, firstName, lastName, occupation, location, picturePath})=>{
                return{userName, firstName, lastName, occupation, location, picturePath}
            }
        ) //since this is an array returning {} is used in return and ()=>{} is the 
        //only callback accepted by the map function and inside () there is {} since array
        res.status(200).json(formattedFriends);
    }
    catch(error){
        res.status(500).json(error.message);
    }
}

export const addRemoveFriend= async(req, res)=>{
    try{
        const{userName, friendUsername}= req.params;
        const user= await User.findOne({username: userName});
        const friend= await User.findOne({username: friendUsername});

        if(user.friends.includes(friendUsername)){
            user.friends= user.friends.filter((username)=> username!== friendUsername);
            friend.friends= friend.friends.filter((username)=> username!==userName);
        }
        else{
            user.friends.push(friendUsername);
            friend.friends.push(userName);
        }

        await user.save();
        await friend.save();

        const userFriends= await Promise.all(
            user.friends.map((userName)=>User.findOne({userName}))  //extracts to the username variable the usernames
        )
        
        const formattedFriends= userFriends.map(
            ({userName, firstName, lastName, occupation, location, picturePath})=>{
                return{userName, firstName, lastName, occupation, location, picturePath}
            }
        ) //since this is an array returning {} is used in return and ()=>{} is the 
        //only callback accepted by the map function and inside () there is {} since array
        res.status(200).json(formattedFriends);

    }
    catch(error){
        res.status(500).json(error.message);
    }
}