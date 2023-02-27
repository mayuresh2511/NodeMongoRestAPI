const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async(req, res, next) => {

    try{
        console.log("Auth header : " + req.header('Authorization'))
        const token = req.header('Authorization').replace('Bearer  ', '');
        console.log(" Auth token val : " + token);
        const decode = await jwt.verify(token, 'myfirstprojectonnode');
        const user = await User.findOne({_id:decode._id}, {'tokens.token':token})
        // if(!user){
        //     throw new Error();
        // }
        req.user = user;
        next();

    }catch(err){
        console.log(err);
        res.status(401).send({error:'Please authenticate'});
    }
}


module.exports = auth