const express = require("express");
const router = express.Router();
const BLL = require("../Models/UsersBLL");
const verifyToken = require("../Middlewares/verifyToken").verifyToken;

router.get("/", verifyToken, async (req, res) => {
    const isVerified = req.headers["isVerified"];

    if (isVerified) {
        const users = await BLL.getAllUsers();
        return res.json(users);
    } else {
        return res.status(401).send({ auth: false });
    }
});

router.get("/:id", verifyToken, async (req, res) => {
    const isVerified = req.headers["isVerified"];

    const id = req.params.id;
    if (isVerified) {
        try {
            const user = await BLL.getUserById(id);
            return res.json(user);
        } catch (error) {
            return res.status(404).json({ error: 'User not found' });
        }
    } else {
        return res.status(401).send({ auth: false });
    }
});

router.post("/", async (req, res) => {
    const newUser = req.body;
    console.log(newUser);

    if (newUser) {
        const status = await BLL.addUser(newUser);
        return res.status(201).json(status);
    } else {
        return res.status(401).send({ auth: false });
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    const isVerified = req.headers["isVerified"];

    const id = req.params.id;
    const newUser = req.body;
    if (isVerified) {
        try {
            const status = await BLL.updateOneUser(id, newUser);
            return res.json(status);
        } catch (error) {
            return res.status(404).json({ error: 'User not found' });
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
            const status = await BLL.deleteOneUser(id);
            return res.status(204).json(status);
        } catch (error) {
            return res.status(404).json({ error: 'User not found' });
        }
    } else {
        return res.status(401).send({ auth: false });
    }
});

module.exports = router;