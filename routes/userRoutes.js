const userRouter = require("express").Router();

const {
    createUserController,
    loginUserController,
    profileController,
    deleteUserController,
    changeUserPasswordController,
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
    passwordValidation,
} = require("../validators/userValidator")


userRouter.post("/register", bodyValidatorMiddleware(authValidation) ,createUserController);
userRouter.post("/login", bodyValidatorMiddleware(loginValidation), loginUserController);
userRouter.get("/profile", authenticateUser ,profileController);
userRouter.delete("/", authenticateUser ,deleteUserController);
userRouter.put("/changePassword", bodyValidatorMiddleware(passwordValidation) ,authenticateUser, changeUserPasswordController);


module.exports = userRouter;