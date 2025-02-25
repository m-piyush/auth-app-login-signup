const UserModel = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({ message: "User already exists", success: false })
        }

        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({
            message: "Signup successfully",
            success: true
        })
    } catch (err) {
        console.log("error", err);
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errormsg = "Auth failed email or passwprd is wrong"

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: errormsg, success: false })
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
            return res.status(404).json({ message: errormsg, success: false })
        }
        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.status(200).json({
            message: "Login successfully",
            success: true,
            jwtToken,
            email,
            name: user.email,

        })
    } catch (err) {
        res.status(500).json({
            message: err.message,
            success: false
        })
    }
}

module.exports = {
    signup,
    login
}