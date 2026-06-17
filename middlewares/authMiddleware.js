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

        req.isAdmin = payload.isAdmin;
        req.isOrganiser = payload.isOrganiser;
        req.userId = payload.userId;

        next();


    } catch(error){
        next(error);
    }

    

}


const authorizeOrganiser = (req, res, next) => {

    try{

        if(req.isOrganiser || req.isAdmin){
           return next();
        }

        next(createError(403, "Unauthorize! You dont have permission to access this resource"));


    } catch(error){
        next(error)
    }
}


module.exports = {
    authenticateUser,
    authorizeOrganiser,
}