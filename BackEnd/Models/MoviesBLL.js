const Movies = require("./MoviesDataBaseBLL")


// GET ALL - READ
const getAllMovies = async () => {
    const Movie = await Movies.find({})
    return Movie
}

//GET BY ID - READ
const getMovieById = async (id) => {
    const Movie = await Movies.findById(id)
    return Movie
}

// ADD one - CREATE
const addMovie = async (obj) => {
    const newMovie = new Movies(obj)
    // newPost._id= String(Math.floor((Math.random() * 100) + 1))
    await newMovie.save()
    return 'Created'
}

// UPDATE one - UPDATE
const updateOneMovie = async (id, obj) => {
    await Movies.findByIdAndUpdate(id, obj)
    return 'Updated'
}


// DELETE one - DELETE
const deleteOneMovie = async (id) => {
    await Movies.findByIdAndDelete(id)
    return 'Deleted'
}

module.exports = { getAllMovies, getMovieById, addMovie, updateOneMovie, deleteOneMovie }