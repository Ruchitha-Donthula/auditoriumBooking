const mongoose=require('mongoose');

const addAuditoriumSchema=mongoose.Schema(
    {
    auditoriumName: String,
    totalSeats: Number,
    description: String,
    auditoriumImage:Buffer,
    imageName: String
    },
    {
        timestamps: true
    }
);

const addAuditorium=mongoose.model('addAuditorium',addAuditoriumSchema);

module.exports=addAuditorium;