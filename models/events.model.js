const mongoose= require('mongoose');
const eventSchema =mongoose.Schema(
    {
        Title: String,
        startDate: Date,
        startTiming: String,
        endDate: Date,
        endTiming: String,
        guests: Array,
        bookedSeats: Number,
        ocassion: String,
        description: String,
        bannerImage: String,
        Image:Buffer,
        auditoriumName: String
    },
    {
        timestamps: true
    }
);
const addEvent= mongoose.model('addEvent',eventSchema);

module.exports= addEvent;