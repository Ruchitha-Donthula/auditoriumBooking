const ejs = require('ejs');
const app = require('../app');
const express = require('express');
const fs = require('fs');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const ISODate = mongoose.Types.ISODate;
const { addAuditorium, addEvent } = require('../models');
var auditoriumName = "";
app.set('view engine', 'ejs');
app.use(express.static('public'));

const handleViewAuditorium = async function (req, res) {
  try {
    const list = await addEvent.find({});
    await Promise.all(list.map(async auditorium => {
      const outputPath = `/home/ab-ii-114/Desktop/project/auditoriumBookingnew/public/images/outputs/${auditorium.bannerImage}`;
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
    res.render('view-detail', { eventLists: list })
  }
  catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
}
const handleGetAuditorium = async function (req, res) {
  const auditoriumNames = await addAuditorium.find({}, { auditoriumName: 1, _id: 0 });
  res.render('book-auditorium', { auditoriumNames: auditoriumNames, primaryForm: true, secondaryForm: false, submitted: false, status: false, statusDisplayText: '' });
}
const handleGetNoofSeats = async function (req, res) {
  auditoriumName = req.body.storemaincategory;
  const result = await addAuditorium.aggregate([
    {
      $match: {
        auditoriumName: auditoriumName
      }
    },
    {
      $group: {
        _id: null,
        count: { $sum: '$totalSeats' }
      }
    }
  ]);
  const auditoriumNames = await addAuditorium.find({}, { auditoriumName: 1, _id: 0 });
  res.render('book-auditorium', { auditoriumNames: auditoriumNames, primaryForm: false, secondaryForm: result[0].count, submitted: false, status: false, statusDisplayText: '' });
}
const handleBookAuditorium = async function (req, res) {
  try {
    const imageurl = `/home/ab-ii-114/Desktop/project/auditoriumBookingnew/public/images/${req.body.bannerImage}`;
    const image = fs.readFileSync(imageurl);

    const { Title, startDate, startTiming, endDate, endTiming, guests, bookedSeats, ocassion, availableSeats, description, bannerImage } = req.body;
    const newEvent = {
      Title: Title,
      startDate: startDate,
      startTiming: startTiming,
      endDate: new Date(endDate + ' ' + endTiming),
      endTiming: endTiming,
      guests: JSON.parse(guests),
      bookedSeats: bookedSeats,
      ocassion: ocassion,
      description: description,
      bannerImage: bannerImage,
      Image: image,
      auditoriumName: auditoriumName
    }
    const anyOverlap = await addEvent.find({
      $and: [
        {
          $or: [
            {
              startDate: { $gte: new Date(startDate + ' ' + startTiming).toISOString(), $lte: new Date(endDate + ' ' + endTiming).toISOString() }
            },
            {
              endDate: { $gte: new Date(startDate + ' ' + startTiming).toISOString(), $lte: new Date(endDate + ' ' + endTiming).toISOString() }
            }
          ]
        },
        {
          auditoriumName: auditoriumName
        }
      ]
    });
    const result = await addAuditorium.aggregate([
      {
        $match: {
          auditoriumName: auditoriumName
        }
      },
      {
        $group: {
          _id: null,
          count: { $sum: '$totalSeats' }
        }
      }
    ]);
    noOfAuditoriums = [];

    const statusDisplayText = anyOverlap.length === 0 ? { startDate: startDate, startTiming: startTiming, endDate: endDate, endTiming: endTiming } : '';
    // `Booked Auditorium from ${startDate} ${startTiming} to ${endDate} ${endTiming} Successfully` : 'Auditorium Booked on that dates';
    const status = anyOverlap.length === 0 ? true : false;
    const auditoriumNames = await addAuditorium.find({}, { auditoriumName: 1, _id: 0 });
    if (anyOverlap.length === 0)
      addEvent.create(newEvent);
    res.render('book-auditorium', { auditoriumNames: auditoriumNames, primaryForm: false, secondaryForm: result[0].count, submitted: true, status: status, statusDisplayText: statusDisplayText });
  }
  catch (e) {
    console.log(e);
  }
}


module.exports = { handleViewAuditorium, handleGetAuditorium, handleGetNoofSeats, handleBookAuditorium };