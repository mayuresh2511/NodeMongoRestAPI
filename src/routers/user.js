const express = require('express');
require('../db/mongoose');
const User =  require('../models/user');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const router = new express.Router();

//Create User
router.post('/user', async (req, res) => {
    user = new User(req.body);
    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token})
    }catch(err){
        res.status(400).send(err)
    } 
});

//Authenticate User
router.post('/user/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch(e){
        res.status(400).send();
    }
})

//Get all Users
router.get('/user', auth, async (req, res) => {
    try{
        const users = await User.find({_id:req.user._id});
        if(!users){
            return res.status(404).send();
        }
        res.send(users);
    }catch(err) {
        res.status(500).send(err);
    }
});

// router.get('/user/me', auth, async (req, res) => {
//     res.send(req.user)
// });

//Get specific user
// router.get('/user/:name', async (req, res) => {
//     try{
//         const user = await User.findOne({name:req.params.name});
//         res.send(user);
//     }catch(err) {
//         res.send(err)
//     };
// });

//Update specific user
router.patch('/user/update/:name', auth, (req, res) => {
    const user = User.findOneAndUpdate({name:req.params.name}, req.body);
    if(!user){
        res.status(404).send();
    }
    res.status(201).send(user);
});

//Delete specific user
router.delete('user/delete/:name', (req, res) => {
    User.findOneAndDelete({name:req.params.name});
})


module.exports = router