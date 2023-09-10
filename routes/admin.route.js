const express = require('express');
const adminRoute = express.Router();
const { adminController } = require('../controllers');

adminRoute
    .route('/')
    .get(adminController.handleViewEvents)

adminRoute
    .route('/view')
    .get(adminController.handleAdminViewAuditorium)

adminRoute
    .route('/add-auditorium')
    .get(adminController.handleGetAuditorium)
    .post(adminController.handleAddAuditorium)

adminRoute
    .route('/view-feedbacks')
    .get(adminController.handleGetFeedbacks)
    .post(adminController.handlePostDeleteFeedback)

adminRoute
    .route('/deleteEvent')
    .post(adminController.handleDeleteEvent)

module.exports = adminRoute;