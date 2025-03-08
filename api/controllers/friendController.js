import { userModel } from "../models/User.js"

export const addFriend = async (req, res) => {
    try {
        const { username, friendName } = req.body;
        const user = await userModel.findOne({ username: username })

        if (!user) {
            return res.status(404).json("User Not found!")
        }

        const friend = await userModel.findOne({ username: friendName })

        if (!friend) {
            return res.status(404).json("User not valid")
        }

        user.friends.push(friend.username)
        friend.friends.push(user.username)

        await user.save()
        await friend.save()

        res.status(200).json({ message: "Friend added successfully!" })
    }
    catch (error) {
        res.status(400).json("Error:", error)
    }
}

export const getFriends = async (req, res) => {
    try {
        const { username } = req.body
        const user = await userModel.findOne({ username: username })

        if (!user) {
            return res.status(404).json("User not found!")
        }

        const friendList = user.friends

        if (friendList.length > 0) {
            const friends = await userModel.find({ username: { $in: friendList } }).select('username profilePicture')
            return res.status(200).json({ message: 'Friends found', friends })
        }
        else {
            return res.status(200).json({ message: "No friends found", friends: [] });
        }
    }
    catch (error) {
        console.error("Failed to retrieve friends:", error);
        res.status(500).json({ message: "Error retrieving friends", error });
    }
}