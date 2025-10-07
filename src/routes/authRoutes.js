const express = require("express")
const router = express.Router();
const User = require("../../models/User")
const jwt = require("jsonwebtoken")



router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({
            message: "Username,Password,Email is required"
        })
    }
    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists"
            })
        }
        const newUser = await User.create({ username, password, email });
        res.status(201).json({
            message: "User registered successfully.",
            user: {
                username: newUser.username,
                email: newUser.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
})


router.post("/login", async (req, res) => {

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and Password is required" })
    }
    try {
        const user = await User.findOne({ username });
        console.log(user)
        if (!user) {
            return res.status(401).json({ message: "Invalid Username and password no object found" })
        }
        if (password !== user.password) {
            console.info("Password: ",password);
            console.info("User Password: ",user.password)
            return res.status(401).json({ message: "Invalid Username and password" })
        }
        const token = jwt.sign({
            id: user.id,
            username: user.username
        },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            })

        return res.status(200).json({
            message: "Login Successfull",
            token,
            user: {
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
})

module.exports = router