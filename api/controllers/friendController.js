import { userModel } from "../models/User.js"

export const addFriend = async (req, res) => {
    try {
        const { firstName, friendName } = req.body;
        const user = await userModel.findOne({ firstName: firstName })

        if (!user) {
            return res.status(404).json("User Not found!")
        }

        const friend = await userModel.findOne({ firstName: friendName })

        if (!friend) {
            return res.status(404).json("User not valid")
        }

        user.friends.push(friend.firstName)
        friend.friends.push(user.firstName)

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
        const { firstName } = req.params
        const user = await userModel.findOne({ firstName: firstName })

        if (!user) {
            return res.status(404).json("User not found!")
        }

        const friendList = user.friends

        if (friendList.length > 0) {
            const friends = await userModel.find({ firstName: { $in: friendList } }).select('firstName profilePicture')
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

export const getSuggestions = async (req, res) => {
    try {
        const { firstName } = req.params
        const user = await userModel.findOne({ firstName: firstName })

        if (!user) {
            return res.status(404).json("User not found!")
        }

        const friendList = user.friends

        if (friendList.length > 0) {
            const friends = await userModel.find({ firstName: { $nin: friendList }, _id: {$ne: user._id} }).select('firstName profilePicture')
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