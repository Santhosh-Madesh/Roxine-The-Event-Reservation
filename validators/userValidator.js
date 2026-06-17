const zod = require("zod");

const authValidation = zod.object({
    name : zod.string().min(8, "Invalid username field"),
    email : zod.email("Invalid email field").toLowerCase(),
    password : zod.string().min(8, "Invalid password field")
});

const loginValidation = zod.object({
    email: zod.email("Invalid email"),
    password : zod.string().min(8, "Invalid password field")
})

const passwordValidation = zod.object({
    password: zod.string().min(8, "Invalid password field")
})


module.exports = {
    authValidation,
    loginValidation,
    passwordValidation,
}