const express = require('express');
require('../db/mongoose');
const Task = require('../models/task');
const auth = require('../middleware/auth');
const router = express.Router();

//Create task
router.post('/task', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        author:req.user._id
    });
    try{
        await task.save();
        res.status(201).send(task);
    }catch(err){
        res.status(400).send();
    }
})

//Get tasks
router.get('/task', auth,async (req, res) => {
    try{
        const tasks = await Task.find({author:req.user._id});
        if(!tasks){
            res.status(404).send();
        }
        res.send(tasks)
    }catch(err){
        res.status(500).send(err);
    }
})

//Get specific task
router.get('/task/:id', auth, async (req, res) => {
    try{
        const task = await Task.findById({_id:req.params.id});
        console.log(`author:${task.author.toString()} user:${req.user._id.toString()}`)
        if (task.author.toString() === req.user._id.toString()){
            res.send(task)
        }else{
            res.send('You are not authorized')
        }
    }catch(err){
        res.status(500).send(err);
    }
})


router.patch('/update/task/:id', auth, async (req, res) => {
    try{
        const task = await Task.findById({_id:req.params.id});
        console.log(`author:${task.author.toString()} user:${req.user._id.toString()}`)
        if (task.author.toString() === req.user._id.toString()){
            const updatedTask = await Task.findByIdAndUpdate({_id:req.params.id}, req.body)
            res.send(updatedTask);
        }else{
            res.send('You are not authorized')
        }
    }catch(err){
        res.status(500).send(err);
    }
})


module.exports = router;