const express = require("express");
const router = express.Router();
const BLL = require("../Models/SubscriptionsBLL");
const verifyToken = require("../Middlewares/verifyToken").verifyToken;

router.get("/", verifyToken, async (req, res) => {
    const isVerified = req.headers["isVerified"];

    if (isVerified) {
        const subscriptions = await BLL.getAllSubscriptions();
        return res.json(subscriptions);
    } else {
        return res.status(401).send({ auth: false });
    }
});

router.get("/:id", verifyToken, async (req, res) => {
    const isVerified = req.headers["isVerified"];

    const id = req.params.id;
    if (isVerified) {
        try {
            const subscription = await BLL.getSubscriptionById(id);
            return res.json(subscription);
        } catch (error) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
    } else {
        return res.status(401).send({ auth: false });
    }
});

router.post("/", verifyToken, async (req, res) => {
    const newSubscription = req.body;

    if (newSubscription) {
        const status = await BLL.addSubscription(newSubscription);
        return res.status(201).json(status);
    } else {
        return res.status(401).send({ auth: false });
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    const isVerified = req.headers["isVerified"];

    const id = req.params.id;
    const newSubscription = req.body;
    if (isVerified) {
        try {
            const status = await BLL.updateOneSubscription(id, newSubscription);
            return res.json(status);
        } catch (error) {
            return res.status(404).json({ error: 'Subscription not found' });
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
            const status = await BLL.deleteOneSubscription(id);
            return res.status(204).json(status);
        } catch (error) {
            return res.status(404).json({ error: 'Subscription not found' });
        }
    } else {
        return res.status(401).send({ auth: false });
    }
});

module.exports = router;