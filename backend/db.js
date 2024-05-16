const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/PaytmApp";

mongoose.connect(mongoURL)
.then(()=>{console.log("Connection to database successfull!")})
.catch(()=>{console.warn("Connection to database failed!")})

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:30
    },
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    password:{
        type:String,
        required:true,
        minLength:6
    }});

const accountSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    balance: {
        type: Number,
        required: true
    }
})

const User  = mongoose.model('users',userSchema);
const Account = mongoose.model('account',accountSchema);

module.exports = {
    User,
    Account
}