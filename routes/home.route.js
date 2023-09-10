const express = require('express');
const ejs = require('ejs')
const app = require('../app');
const { homeController } = require('../controllers');

app.set('view engine', 'ejs');
app.use(express.static('public'));

const homeRoute = express.Router();
homeRoute
    .route('/')
    .get(homeController.handleHomePage)

homeRoute
    .route('/contact-us')
    .get(homeController.handleContactPage)
    .post(homeController.handlePostContactUs)

homeRoute
    .route('/about-us')
    .get(homeController.handleAboutPage)

homeRoute
    .route('/login')
    .get(homeController.handleLoginPage)
    .post(homeController.handlePostLoginPage)

homeRoute
    .route('/createAccount')
    .get(homeController.handleCreatePage)
    .post(homeController.handlePostCreatePage)

module.exports = homeRoute;
