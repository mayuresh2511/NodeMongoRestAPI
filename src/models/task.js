const mongoose = require('mongoose');
const validator = require('validator');

const taskSchema = new mongoose.Schema({

    description:{
        type:String,
        required: true
    },

    completed:{
        type: Boolean,
        required: true
    },

    author:{
        type:mongoose.Schema.Types.ObjectId,
        required: true
    }

});
const Task = mongoose.model('Task', taskSchema);


module.exports = Task