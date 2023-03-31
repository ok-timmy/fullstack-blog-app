const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    firstName: {
            type:String,
            required : true
        },
    secondName: {
            type:String,
            required :true
        },
    userName : {
            type :String,
            required: true
        },
    email : {
            type: String,
            unique: true,
            required : true
        },
        bio : {
            type: String,
        },
    password : {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: 'https://i.pinimg.com/736x/a8/57/00/a85700f3c614f6313750b9d8196c08f5.jpg'
        },
        refreshToken : {
            type: String
        }

}, {
    timestamps: true
});

module.exports = mongoose.model("User",  userSchema);