const mongoose = require("mongoose")

const UsersSchema = mongoose.Schema({
    FirstName: String,
    LastName: String,
    Username: String,
    Password: String
})

module.exports = mongoose.model("Users", UsersSchema)