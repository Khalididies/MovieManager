const express = require("express");
const router = express.Router();
const BLL = require("../Models/MoviesBLL");
const verifyToken = require("../Middlewares/verifyToken").verifyToken;

router.get("/", verifyToken, async (req, res) => {
    const isVerified = req.headers["isVerified"];

    if (isVerified) {
        const movies = await BLL.getAllMovies();
        return res.json(movies);
    } else {
        return res.status(401).send({ auth: false });
    }
});

router.get("/:id", verifyToken, async (req, res) => {
    const isVerified = req.headers["isVerified"];

    const id = req.params.id;
    if (isVerified) {
        try {
            const movie = await BLL.getMovieById(id);
            return res.json(movie);
        } catch (error) {
            return res.status(404).json({ error: 'Movie not found' });
        }
    } else {
        return res.status(401).send({ auth: false });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const newMovie = req.body;

    if (newMovie) {
        const status = await BLL.addMovie(newMovie);
        return res.status(201).json(status);
    } else {
        return res.status(401).send({ auth: false });
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    const isVerified = req.headers["isVerified"];

    const id = req.params.id;
    const newMovie = req.body;
    if (isVerified) {
        try {
            const status = await BLL.updateOneMovie(id, newMovie);
            return res.json(status);
        } catch (error) {
            return res.status(404).json({ error: 'Movie not found' });
        }
    } else {
        return res.status(401).send({ auth: false });
    }
});

router.delete("/:id", verifyToken, async (req, res) => {
    const isVerified = req.headers["isVerified"];

    const id = req.params.id;
    if (isVerified) {
        try {
            const status = await BLL.deleteOneMovie(id);
            return res.status(204).json(status);
        } catch (error) {
            return res.status(404).json({ error: 'Movie not found' });
        }
    } else {
        return res.status(401).send({ auth: false });
    }
});

module.exports = router;