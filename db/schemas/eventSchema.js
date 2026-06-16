const mongoose = require("mongoose");


const eventScheme = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    }, 
    date:{
        type: Date,
        required: true,
    // Date format 'yyyy-mm-dd'
    }, 
    duration:{
        type: Number,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    photo:{
        type: String, // the string represents the directory path
    },
    available_tickets:{
        type: Number,
        required: true,
    },
    cost:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})

const eventModel = mongoose.model("event", eventScheme);


module.exports = eventModel;