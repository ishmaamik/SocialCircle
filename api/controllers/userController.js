import { userModel } from "../models/User.js"
import bcrypt from "bcryptjs"
export const addUser = async (req, res) => {

    try {
        console.log("Received data:", req.body);
        const { firstName, lastName, email, password } = req.body;
        const userDb = new userModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        })


        await userDb.save();
        console.log("Saved data:", userDb);
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        res.status(400).json(error);
    }


}

export const getUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username: username })

        if (!user) {
            res.status(400).json("User not found")
        }

        const isMatch = bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(401).json("Wrong credentials")
        }

        res.status(200).json("User authenticated successfully", user)
    }

    catch (error) {
        res.send(error)
    }
}


export const setUsername = async (req, res) => {
    const { email} = req.params;  // Assuming the request contains the email and the new username
    const {newUsername}= req.body;
    
    if (!email || !newUsername) {
        return res.status(400).json({ message: "Missing email or new username" });
    }

    try {
        const user = await userModel.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the new username already exists to avoid duplicates
        const existingUser = await userModel.findOne({ username: newUsername });
        if (existingUser) {
            return res.status(400).json({ message: "Username already in use" });
        }

        // Update the username
        user.username = newUsername;

        // Save the updated user
        await user.save();

        // Respond back with success message
        res.status(200).json({ message: "Username updated successfully" });
    } catch (error) {
        console.error("Error updating username:", error);
        res.status(500).json({ message: "Internal server error", error: error });
    }
}

