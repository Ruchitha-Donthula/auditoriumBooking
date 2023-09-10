const express = require('express');
const userRoute = express.Router();
const { userController } = require('../controllers');

userRoute
    .route('/')
    .get(userController.handleViewAuditorium);

userRoute
    .route('/book-auditorium')
    .get(userController.handleGetAuditorium)
    .post(userController.handleBookAuditorium)

userRoute
    .route('/noOfSeats')
    .post(userController.handleGetNoofSeats)

module.exports = userRoute;