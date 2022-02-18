const router = require('express').Router()
const Reservation = require('../models/Reservation')
const User = require('../models/User')

router.post('/create', async (req, res)=>{
    try{
        const newReservation = new Reservation({
            customerID: req.body.customerID,
            hotelID: req.body.hotelID,
            totalCost: req.body.totalCost,
            checkInDate: req.body.checkInDate,
            checkOutDate: req.body.checkOutDate
        })
        const registeredReservation = await newReservation.save();
        res.status(200).json(registeredReservation);
    } catch(err){
        res.status(500).json(err)
    }
})

router.get('/getreservations', async (req, res)=>{
    const username = req.query.username;
    try{
        let userID = null;
        if(username) {
            const matchedUser  = await User.findOne({username})
            userID = matchedUser._id.toString();
        }
        const reservations = userID ? await Reservation.find({customerID: userID}) : await Reservation.find()
        res.status(200).json(reservations)
    } catch(err){
        res.status(500).json(err)
    }
})
module.exports = router