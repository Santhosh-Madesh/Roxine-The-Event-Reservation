const zod = require("zod");

const authValidation = zod.object({
    name : zod.string().min(8, "Invalid user name"),
    email : zod.email("Invalid email"),
    password : zod.string().min(8, "Invalid password")
});


module.exports = {
    authValidation,
}