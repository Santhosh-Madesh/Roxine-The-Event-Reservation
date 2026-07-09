const createError = require("http-errors")

const requests = new Map();

const WINDOW_LIMIT = 60 * 1000;

const MAX_REQUESTS = 5;

const slidingWindowAuthLimiter = (req, res, next) => {
    
    const ip = req.id;
    const now = Date.now();

    let timestamps = requests.get(ip) || [];

    timestamps = timestamps.filter(
        time => now - time < WINDOW_LIMIT
    );


    if(timestamps.length >= MAX_REQUESTS){
        return next(createError(429, "Too many requests! try again later"));
    }

    timestamps.push(now);

    requests.set(ip, timestamps);

    next();
}

module.exports = slidingWindowAuthLimiter;