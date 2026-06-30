const createError  = require("http-errors")


const bodyValidatorMiddleware = (schema) => (req, res, next) => {

    const isBodyValidated = schema.safeParse(req.body);

    if(isBodyValidated.success){

        req.validatedBodyData = isBodyValidated.data;

        return next();
    }

    next(createError(400, "Bad request, Missing fields or invalid requst field values"));

}

const paramValidatorMiddleware = (schema) => (req, res, next)=>{
    
    const isParamValid = schema.safeParse(req.params);

    if(isParamValid.success){

        req.validatedParamData = isParamValid.data;

        return next();
    }

    next(createError(400, "Bad request, Missing fields or invalid request field values"));
}

const queryValidatorMiddleware = (schema) => (req, res, next)=>{
    
    const validateQuery = schema.safeParse(req.query);

    if(validateQuery.success){

        req.validatedQueryData = validateQuery.data;

        return next();
    }

    next(createError(400, "Bad request, Missing fields or invalid request field values"));
}

module.exports = {
    bodyValidatorMiddleware,
    paramValidatorMiddleware,
    queryValidatorMiddleware,
}