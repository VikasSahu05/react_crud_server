const mongoose = require('mongoose');

const messageSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        lowercase:true,
        unique:true,
    },
    message:{
        type:String,
        required:[true,"Message is required"],
        trim:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
});

const Message = mongoose.model("Message",messageSchema);

module.exports = Message;