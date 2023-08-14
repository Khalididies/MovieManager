const express = require("express")
const router = express.Router()
const BLL = require("../Models/UsersBLL")
require("dotenv").config()

const jwt = require("jsonwebtoken")

// localhost:8000/api/auth/login
router.post("/login", async (req, res) => {
    const Username = req.body.Username
    const Password = req.body.Password
    
    const users = await BLL.getAllUsers()
    const user = users.find(user => user.Username === Username && user.Password === Password)

    // check if user and password match db
    if (user) {
        // get the user id = findUserById
        const userId = user._id
        // get the user role from the db
        const userRole = "CTO"
        // get the real secret key from db or env variable
        const RSA_PRIVATE_KEY = process.env.SECRET_KEY
        const token = jwt.sign({ id: userId }, RSA_PRIVATE_KEY, { expiresIn: "1d" }) // expires in 60 seconds
        return res.status(200).json({ auth: true, token: token, role: userRole, id: userId,user:user })
    } else {
        return res.status(401).send({ auth: false })
    }
})

module.exports = router