const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const {
    retriveEventById,
} = require("../models/eventOrganiserModels");
const { string } = require("zod");

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

const authorizeAdmin = (req, res, next) => {

    try{

        if(req.isAdmin){
           return next();
        }

        next(createError(403, "Unauthorize! You dont have permission to access this resource"));


    } catch(error){
        next(error)
    }
}

const authorizeOwner = async (req, res, next)=> {

    try{

        const userId = req.userId;
        const { eventId } = req.validatedParamData;

        const event = await retriveEventById(eventId);

        if(!event){
            return next(createError(404, "Data not found!"));
        }

        if(String(event.ownership) === userId){
            return next()
        }

        next(createError(403, "Unauthorized Ownership! you are not allowed to send this request"))


    } catch(error){
        next(error);
    }
}


module.exports = {
    authenticateUser,
    authorizeOrganiser,
    authorizeOwner,
    authorizeAdmin
}