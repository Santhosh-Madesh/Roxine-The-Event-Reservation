
const mongoose = require("mongoose");


const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status:{
        type: String,
        enum: ["pending", "rejected", "accepted"],
        default: "pending"
    }
},{
    timestamps: true,
})

const organizationModel = mongoose.model("organisation", organizationSchema);


module.exports = organizationModel;