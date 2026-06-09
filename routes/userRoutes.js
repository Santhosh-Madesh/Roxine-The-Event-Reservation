const userRouter = require("express").Router();

const {
    createUserController,
} = require("../controllers/userControllers");



userRouter.post("/register", createUserController);


module.exports = userRouter;