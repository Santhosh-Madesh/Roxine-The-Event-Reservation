const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email : {
        type : String,
        required: true,
        unique: true,
        trim: true,
    },
    password : {
        type: String,
        required: true,
    },
    role : {
        type : String,
        enum : ["user", "organiser", "admin"],
        default : "user"
    },
    bookings : [mongoose.Schema.Types.ObjectId],
    active : {
        type: Boolean,
        default : true
    },
    
},
{
        timestamps : true
    }
)

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;