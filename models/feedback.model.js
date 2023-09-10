const mongoose = require('mongoose');
const feedbackSchema = {
    fullname: String,
    contactnumber: Number,
    email: String,
    feedback: String
}

const userfeed = mongoose.Schema(feedbackSchema, { timestamps: true });

const addFeedback = mongoose.model('feedback', userfeed);

module.exports = addFeedback;