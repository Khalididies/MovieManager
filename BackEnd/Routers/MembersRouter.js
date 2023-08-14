const express = require("express");
const router = express.Router();
const BLL = require("../Models/MembersBLL");
const verifyToken = require("../Middlewares/verifyToken").verifyToken;

router.get("/", verifyToken, async (req, res) => {
    const isVerified = req.headers["isVerified"];

    if (isVerified) {
        const members = await BLL.getAllMembers();
        return res.json(members);
    } else {
        return res.status(401).send({ auth: false });
    }
});

router.get("/:id", verifyToken, async (req, res) => {
    const isVerified = req.headers["isVerified"];

    const id = req.params.id;
    if (isVerified) {
        try {
            const member = await BLL.getMemberById(id);
            return res.json(member);
        } catch (error) {
            return res.status(404).json({ error: 'Member not found' });
        }
    } else {
        return res.status(401).send({ auth: false });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const newMembers = req.body;

    if (newMembers) {
        const status = await BLL.addMember(newMembers);
        return res.status(201).json(status);
    } else {
        return res.status(401).send({ auth: false });
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    const isVerified = req.headers["isVerified"];

    const id = req.params.id;
    const newMembers = req.body;
    if (isVerified) {
        try {
            const status = await BLL.updateOneMember(id, newMembers);
            return res.json(status);
        } catch (error) {
            
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
            const status = await BLL.deleteOneMember(id);
            return res.status(204).json(status);
        } catch (error) {
            return res.status(404).json({ error: 'Member not found' });
        }
    } else {
        return res.status(401).send({ auth: false });
    }
});

module.exports = router;