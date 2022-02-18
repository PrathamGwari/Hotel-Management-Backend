const router = require('express').Router();
const Hotel = require('../models/Hotel')
// const cloudinary = require('cloudinary').v2;

// cloudinary.config({ 
//     cloud_name: 'dy0j4c40y', 
//     api_key: '527293873171699', 
//     api_secret: 'Do2QWb4MsM0NG7cXwC16Yq1xJ6s',
//     secure: true
// });

// ADD HOTEL
router.post('/add', async (req, res)=>{
    
    try{
        // const uploadedImage = req.files.hotelImage;
        // let imageURL;
        // cloudinary.uploader.upload(uploadedImage.tempFilePath, (err, res)=>{
        //     imageURL = res.url;
        // });
        const newHotel = new Hotel({
            name: req.body.name,
            address: req.body.address,
            location: req.body.location,
            costPerNight: parseInt(req.body.costPerNight),
            facilities: req.body.facilities,
            image: 'https://i.ibb.co/Wg1khSF/hotel-image-demo.jpg'
        })
        console.log(newHotel)

        const addedHotel = await newHotel.save();
        console.log(addedHotel)
        res.status(200).json(addedHotel);

    } catch(err){
        res.status(500).json(err);
    }
})

router.get('/gethotels', async (req, res)=>{
    const destination = req.query.destination
    try{
        const hotels = destination != null ? await Hotel.find({location : {$regex : new RegExp(destination, "i")} }) : await Hotel.find()
        res.status(200).json(hotels);
    } catch(err){
        res.status(500).json(err);
    }
})
module.exports = router;