const userRouter = require("express").Router();

const {
    createUserController,
    loginUserController,
    profileController,
} = require("../controllers/userControllers");

const {
    authenticateUser,
} = require("../middlewares/authMiddleware");

const {
    bodyValidatorMiddleware,
} = require("../middlewares/validatorMiddleware");

const {
    authValidation,
    loginValidation,
} = require("../validators/userValidator")


userRouter.post("/register", bodyValidatorMiddleware(authValidation) ,createUserController);
userRouter.post("/login", bodyValidatorMiddleware(loginValidation), loginUserController);
userRouter.get("/profile", authenticateUser ,profileController);


module.exports = userRouter;