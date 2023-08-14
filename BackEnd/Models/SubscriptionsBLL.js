const Subscriptions = require("./SubscriptionsDatabaseBLL");

// GET ALL - READ
const getAllSubscriptions = async () => {
    const subscriptions = await Subscriptions.find({});
    return subscriptions;
};

// GET BY ID - READ
const getSubscriptionById = async (id) => {
    const subscription = await Subscriptions.findById(id);
    return subscription;
};

// ADD one - CREATE
const addSubscription = async (obj) => {
    const newSubscription = new Subscriptions(obj);
    await newSubscription.save();
    return 'Created';
};

// UPDATE one - UPDATE
const updateOneSubscription = async (id, obj) => {
    await Subscriptions.findByIdAndUpdate(id, obj);
    return 'Updated';
};

// DELETE one - DELETE
const deleteOneSubscription = async (id) => {
    await Subscriptions.findByIdAndDelete(id);
    return 'Deleted';
};

module.exports = {
    getAllSubscriptions, getSubscriptionById, addSubscription, updateOneSubscription, deleteOneSubscription
};