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
    password : {
            type: String,
            required: true
        }

}, {
    timestamps: true
});

module.exports = mongoose.model("User",  userSchema);