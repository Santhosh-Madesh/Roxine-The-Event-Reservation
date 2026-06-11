const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const authenticateUser = (req, res, next) => {

    try{

        const authHeaders = req.headers.authorization;

        if(!authHeaders || !authHeaders.startsWith("Bearer ")){
            return next(createError(401, "Unauthorized request, Please login to access the resource"));
        }

        const token = authHeaders.split(" ")[1];

        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        req.userId = payload.userId;

        next();


    } catch(error){
        next(error);
    }

    

}


module.exports = {
    authenticateUser,
}