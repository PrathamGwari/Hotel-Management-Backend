const mongoose = require('mongoose')

const HotelSchema = mongoose.Schema({
    name : {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
        unique: true,
    },
    location: {
        type: String,
        require: true
    },
    costPerNight: {
        type: Number,
        require: true
    },
    facilities: {
        type: Array,
        require: true,
    },
    image: {
        type: String,
        require: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Hotel', HotelSchema);