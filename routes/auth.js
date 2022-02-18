const router = require('express').Router();
const User = require('../models/User')
const bcrypt = require('bcrypt')

// REGISTER
router.post('/register', async(req, res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    try{
        const newUser = User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        })
        const registeredUser = await newUser.save();
        res.status(200).json(registeredUser);
    } catch(err) {
        res.status(500).json(err);
    }
})


// LOGIN
router.post('/login', async (req, res)=>{
    try{
        const matchedUser = await User.findOne({email: req.body.email});
        !matchedUser && res.status(400).json('user not found! Please register first');

        const validate = await bcrypt.compare(req.body.password, matchedUser.password);
        !validate && res.status(400).json('wrong credentials!');

        res.status(200).json(matchedUser);
    } catch(err){
        res.status(500).json(err)
    }
})
module.exports = router