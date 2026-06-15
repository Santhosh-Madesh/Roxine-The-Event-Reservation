const mongoose = require("mongoose");


const bookSchema = new mongoose.Schema({
    event_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type: String,
        enum: ["not booked", "booked", "cancelled"],
        default: "not booked"
    },
    active:{
        type: Boolean,
        default: true
    }
})


const bookModel = mongoose.model("book", bookSchema);

module.exports = bookModel;