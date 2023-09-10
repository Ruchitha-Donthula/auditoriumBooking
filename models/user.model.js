const mongoose = require('mongoose');
const userSchema = {
    username: String,
    password: String,
    fullname: String,
    email: String,
    role: String
}

const userSch = mongoose.Schema(userSchema, { timestamps: true });

const addUser = mongoose.model('user', userSch);

module.exports = addUser;