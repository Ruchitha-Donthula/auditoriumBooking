const ejs = require('ejs');
const app = require('../app');
const express = require('express');
const { addUser, addFeedback, addEvent } = require('../models');

app.set('view engine', 'ejs');
app.use(express.static('public'));

const handleHomePage = async function (req, res) {
  try {
    const list = await addEvent.find({});
    await Promise.all(list.map(async auditorium => {
      const outputPath = `/home/siddharth/Desktop/project/auditoriumBookingnew/public/images/outputs/${auditorium.bannerImage}`;
      try {
        await fs.promises.writeFile(outputPath, auditorium.bannerImage);
        const sDate = new Date(auditorium.startDate);
        const eDate = new Date(auditorium.startDate);
        auditorium['sDate'] = `${sDate.getFullYear()}-${sDate.getMonth() + 1}-${sDate.getDate()}`
        auditorium['eDate'] = `${eDate.getFullYear()}-${eDate.getMonth() + 1}-${eDate.getDate()}`
      } catch (error) {
        console.error('Error writing image:', error);
      }
    }));
    console.log(list.length);
    const status = list.length === 0 ? false : true;
    console.log(status);
    res.render('index', { eventLists: list, status: status })
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
}

const handleContactPage = async (req, res) =>
  res.render('contact-us', { statusText: '' });

const handleAboutPage = async (req, res) =>
  res.render('about-us', {});

const handleLoginPage = async (req, res) =>
  res.render('login', {});

const handlePostLoginPage = async function (req, res) {
  try {
    const user = await addUser.findOne({
      $and: [{ username: req.body.username }, { password: req.body.password }]
    });

    if (user != null) {
      if (user.role === 'admin') {
        res.redirect('/admin/');
      } else {
        res.redirect('/user/');
      }
    } else {
      const status = 'invalid username and password';
      res.render('login', { status: status });
    }
  } catch (error) {
    console.error('Error handling login page:', error);
    res.status(500).send('An error occurred');
  }
}
const handleCreatePage = async function (req, res) {
  res.render('create-account', {});
}
const handlePostCreatePage = async function (req, res) {
  try {
    const { fullName, username, email, password, reEnterPassword } = req.body;
    const newUser = {
      fullname: fullName,
      username: username,
      password: password,
      email: email,
      role: 'user'
    }
    addUser.create(newUser);
    res.render('login', {})
  }
  catch (e) {
    console.error('Error handling Create Page: ', error);
    res.status(500).send('An error occurred');
  }
}
const handlePostContactUs = async function (req, res) {
  try {
    const { fullname, contactnumber, email, feedback } = req.body;
    const newFeedback = {
      fullname: fullname,
      contactnumber: contactnumber,
      email: email,
      feedback: feedback
    }
    await addFeedback.create(newFeedback);
    const statusText = "Feedback Submitted Successfully";
    res.render('contact-us', { statusText: statusText })
  }
  catch (e) {
    console.error('Error handling Posting Feedback: ', error);
    res.status(500).send('An error occurred');
  }

}

module.exports = { handleHomePage, handleAboutPage, handleContactPage, handleLoginPage, handlePostLoginPage, handleCreatePage, handlePostCreatePage, handlePostContactUs };

