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