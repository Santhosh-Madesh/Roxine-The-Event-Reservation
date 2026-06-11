const createError  = require("http-errors")


const bodyValidatorMiddleware = (schema) => (req, res, next) => {

    const isBodyValidated = schema.safeParse(req.body);

    if(isBodyValidated.success){

        req.validatedData = req.body;

        return next();
    }

    next(createError(400, "Bad request, Missing fields or invalid requst field values"));

}

module.exports = {
    bodyValidatorMiddleware
}