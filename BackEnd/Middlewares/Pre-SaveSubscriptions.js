const SubscriptionsSchema = require("../Models/SubscriptionsDatabaseBLL");
const Movies = require("../Models/MoviesDataBaseBLL");
const Members = require("../Models/MembersDataBaseBLL");

SubscriptionsSchema.pre('save', async function (next) {
    try {
        const newMovie = await Movies.findOne({ _id: this.MovieID });
        if (newMovie) {
            this.MovieID = newMovie._id;
        }
    } catch (error) {
        return { error: 'Movie not found' }
    }

    try {
        const newMember = await Members.findOne({ _id: this.MemberID });
        if (newMember) {
            this.MemberID = newMember._id;
        }
    } catch (error) {
        return { error: 'Member not found' }
    }
    
    next();
});