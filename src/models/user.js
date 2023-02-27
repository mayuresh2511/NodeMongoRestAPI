const mongoose = require('mongoose');
const validator = require('validator'); 
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true 
    },

    email:{
        type: String,
        unique: true,
        validate(val){
            if (!validator.isEmail(val)){
                throw new Error('Invalid email');
            }
        }
    },

    password:{
        type:String,
        required: true
    },

    age:{
        type: Number,
        validate(value){
            if(value < 0){
                throw new Error('Age should be more than 0')
            }
        }
    },

    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const token = await jwt.sign({_id:user._id.toString()}, 'myfirstprojectonnode');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
}

userSchema.statics.findByCredentials = async(email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error('Unable to login wrong email');
    }
    const ismatch = await bcryptjs.compare(password, user.password);
    if(!ismatch){
        throw new Error('Unable to login wrong password');
    }
    return user;
}


userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);


module.exports = User