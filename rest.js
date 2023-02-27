const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true 
});


const User = mongoose.model('User', {
    name:{
        type: String,
        required: true 
    },

    email:{
        type: String,
        validate(val){
            if (!validator.isEmail(val)){
                throw new Error('Invalid email');
            }
        }
    },

    age:{
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error('Age should be more than 0')
            }
        }
    }
});

const me = new User({
    name: 'Mihir',
    email: 'mymail123',
    age: 18
})

me.save().then(() => console.log(me)).catch((error) => console.log(error));