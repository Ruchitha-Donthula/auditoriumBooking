const mongoose = require('mongoose');//require mongoose
const userSchema = { //declaring the fields of the table
    username: String,
    password: String,
    fullname: String,
    email: String,
    role: String
}

const userSch = mongoose.Schema(userSchema, { timestamps: true }); //making schema

const addUser = mongoose.model('user', userSch);//make a model with name user and assign a variable to it
                                                 
module.exports = addUser; //export table