const userRouter = require("express").Router();

const {
    createUserController,
    loginUserController,
} = require("../controllers/userControllers");

const {
    bodyValidatorMiddleware,
} = require("../middlewares/validatorMiddleware");

const {
    authValidation,
    loginValidation,
} = require("../validators/userValidator")


userRouter.post("/register", bodyValidatorMiddleware(authValidation) ,createUserController);
userRouter.post("/login", bodyValidatorMiddleware(loginValidation), loginUserController);


module.exports = userRouter;