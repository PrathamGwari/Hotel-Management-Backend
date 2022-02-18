const mongoose = require('mongoose')

const reservationSchema = mongoose.Schema({
    customerID: {
        type: String,
        require: true,
    }, 
    hotelID: {
        type: String,
        require: true
    },
    totalCost: {
        type: Number,
        require: true
    }, 
    checkInDate: {
        type: String,
        require: true
    },
    checkOutDate: {
        type: String,
        require: true
    }
}) 

module.exports = mongoose.model("Reservation", reservationSchema)