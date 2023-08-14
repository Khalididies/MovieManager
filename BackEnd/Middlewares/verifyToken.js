const jwt = require("jsonwebtoken")

require("dotenv").config()

function verifyToken(req, res, next) {
    const token = req.headers["x-access-token"]


    // checks if token exists
    if (!token) return res.status(401).json({ auth: false, msg: "No token provided" })


    // tries to verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {


        // if an err occured, the token is not valid
        if (err) return res.status(500).json({ err: err, msg: "Unable to verify token" })


        // otherwise, add to the headers a "isVerified"
        req.headers["isVerified"] = true
        next()
    })

}

module.exports = { verifyToken }