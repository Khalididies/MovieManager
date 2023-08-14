const mongoose = require("mongoose")

const MoviesSchema = mongoose.Schema({
    name: String,
    Year: String,
    Genres:String,
    Image: String,
    moviecap: String
})

module.exports = mongoose.model("Movies", MoviesSchema)