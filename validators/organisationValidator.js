const zod = require("zod");
const mongoose = require("mongoose");


const organisationReqValidation = zod.object({
    name: zod.string().min(8, "Invalid name field"),
});

const orgReqUpdateValidation = zod.object({
    userId: zod.string().refine(
        (val) => mongoose.Types.ObjectId.isValid(val),
        "Invalid user id field"
    ),
    newObj: zod.object({
        status: zod.enum(["rejected", "pending", "accepted"])
    })
})

module.exports = {
    organisationReqValidation,
    orgReqUpdateValidation,
}