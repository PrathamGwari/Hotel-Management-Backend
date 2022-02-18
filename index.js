const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const authRoute = require('./routes/auth')
const hotelRoute = require('./routes/hotel');
const reservationRoute = require('./routes/reservation')

app.use(express.json());
app.use(cors())
dotenv.config()
app.use(fileUpload({
    useTempFiles: true
}))

mongoose.connect(process.env.MONGO_URL)
.then(console.log('connected to mongodb'))
.catch(err=> console.log(err))

app.use('/api/auth', authRoute);
app.use('/api/hotel', hotelRoute);
app.use('/api/reservation', reservationRoute);

app.listen(process.env.PORT || 8000, ()=>{
    console.log('backend is running .....')
})