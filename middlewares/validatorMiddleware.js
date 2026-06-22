const createError  = require("http-errors")


const bodyValidatorMiddleware = (schema) => (req, res, next) => {

    const isBodyValidated = schema.safeParse(req.body);

    if(isBodyValidated.success){

        req.validatedData = req.body;

        return next();
    }

    next(createError(400, "Bad request, Missing fields or invalid requst field values"));

}

const paramValidatorMiddleware = (schema, paramName) => (req, res, next)=>{

    const paramValue = {
        name:req.params.name,
    }

    const paramObj = {
            [paramName]: paramValue[paramName]
        }
    
    const isParamValid = schema.safeParse(
        paramObj
    );

    if(isParamValid.success){

        req.validatedData = paramObj;

        return next();
    }

    next(createError(400, "Bad request, Missing fields or invalid request field values"));
}

const queryValidatorMiddleware = (schema) => (req, res, next)=>{
    
    const validateQuery = schema.safeParse(req.query);

    if(validateQuery.success){

        req.validatedData = validateQuery.data;

        return next();
    }

    next(createError(400, "Bad request, Missing fields or invalid request field values"));
}

module.exports = {
    bodyValidatorMiddleware,
    paramValidatorMiddleware,
    queryValidatorMiddleware,
}