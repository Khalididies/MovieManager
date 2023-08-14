const mongoose = require("mongoose")

const SubscriptionsSchema = new mongoose.Schema({
    MovieID: String,
    MemberID: String,
    Date: String
});

// const SubscriptionsSchema = new mongoose.Schema({
//     MovieID: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Movies'
//       },
//     MemberID: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Members'
//       },
//     Date: Date
// });

module.exports = mongoose.model('Subscriptions', SubscriptionsSchema);