const userRouter = require("express").Router();

const {
    createUserController,
} = require("../controllers/userControllers");

const {
    bodyValidatorMiddleware,
} = require("../middlewares/validatorMiddleware");

const {
    authValidation
} = require("../validators/userValidator")


userRouter.post("/register", bodyValidatorMiddleware(authValidation) ,createUserController);


module.exports = userRouter;