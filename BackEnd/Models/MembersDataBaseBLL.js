const mongoose = require("mongoose")

const MembersSchema = mongoose.Schema({
    FullName: String,
    Email: String,
    City: String,
})

module.exports = mongoose.model("Members", MembersSchema)