const zod = require("zod");


const organisationReqValidation = zod.object({
    name: zod.string().min(8, "Invalid name field"),
});

module.exports = {
    organisationReqValidation
}