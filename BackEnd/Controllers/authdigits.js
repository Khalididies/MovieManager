const express = require("express")
const router = express.Router()
const { totp, authenticator } = require("otplib")
const nodemailer = require("nodemailer")
require("dotenv").config()

const secret = authenticator.generateSecret() // return a string with random letters and numbers

totp.options = { step: 30 } // wait 30 seconds before making to token invalid

// localhost:8000/api/auth/sendGenerateToken/:Email
router.get("/sendGenerateToken/:Email", async (req, res) => {
    const userEmail = req.params.Email
    try {
        const token = totp.generate(secret) // returns a 6 digits token the we will verify on the next request
        
        let mailOptions = {
            from: process.env.EmailtoSendEmails,
            to: userEmail,
            subject: "Hi, your OTP:",
            text: `Your OTP is ${token}`
        }

        const transporter = nodemailer.createTransport({
            service: "gmail", // you can use another email service
            auth: {
                user: process.env.AuthUser,
                pass: process.env.AuthPass
            }
        })

        let info = await transporter.sendMail(mailOptions)
        console.log(token)
        return res.send(token)
    } catch (e) {
        console.log(e.message)
    }
})

// localhost:8000/api/auth/verify/:token
router.get("/verify/:token", (req, res) => {
    const token = req.params.token
    const isValid = totp.verify({ token, secret })
    res.send(isValid)
})

module.exports = router