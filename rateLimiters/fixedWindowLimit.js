const { rateLimit } = require("express-rate-limit");


const authLimiters = rateLimit({
    windowMs: 1000 * 60 * 2,
    limit: 2,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests, please try again",
    statusCode: 429,
})


module.exports = {
    authLimiters,
}