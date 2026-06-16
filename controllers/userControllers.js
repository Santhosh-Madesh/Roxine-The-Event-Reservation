const {
    createUser,
    retriveUser,
    retriveUserById,
    deleteUserById,
    changeUserPasswordById,
} = require("../models/userModels");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createError  = require("http-errors");


const createUserController = async(req, res, next) => {

    try{

        const { name, email, password } = req.validatedData;

        const userExists = await retriveUser(email);

        if(userExists){
            return res.status(400).json(
                {
                    success: false,
                    message: "Bad request, user with the given email already exist, try logging in."
                }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = {
            name : name,
            email : email,
            password : hashedPassword
        }

        const newUser = await createUser(user);

        if(!newUser){
            return res.status(500).json({
                success: false,
                message: "Server failed before saving the user data, please try again"
            })
        }

        res.status(201).json({
            success: true,
            message: "New user created successfully!",
            data : {
                name : newUser.name,
                email : newUser.email,
                role : newUser.role
            }
        })


    } catch(error){
        next(error);
    }

}


const loginUserController = async(req, res, next) => {

    try{

        const { email, password } = req.validatedData;

        const user = await retriveUser(email);

        if(!user){
            return next(createError(400, "Invalid email or password"));
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return next(createError(400, "Invalid email or password"));
        }

        const payload = {
            userId : user.id,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);


        res.json({
            success: true,
            message: "Login successful",
            token : token
        });


    } catch(error){

        next(error);

    }

}

const profileController = async(req, res, next) => {

    try{

        const userId = req.userId;

        const user = await retriveUserById(userId);

        if(!user){
            return next(createError(500, "Internal server error"))
        }

        delete user.password;

        res.json({
            success: true,
            message: "User data retrieved successfully",
            data: user
        })


    } catch(error){
        next(error);
    }
}

const deleteUserController = async(req, res, next) => {

    try{

        const userId = req.userId;

        const deletedData = await deleteUserById(userId);

        if(!deletedData){
            return next(createError(500, "Internal Server error, try again later"));
        }

        res.status(204).send();


    } catch(error){
        next(error);
    }
}

const changeUserPasswordController = async(req, res, next) => {

    try{

        const userId = req.userId;
        const { password } = req.validatedData;


        const hashedPassword = await bcrypt.hash(password, 10);

        const passwordChanged = await changeUserPasswordById(userId, hashedPassword);

        if(!passwordChanged){
            return createError(500, "Internal Server Error, try again");
        }

        res.status(204).send();

    } catch(error){
        next(error);
    }
}

module.exports = {
    createUserController,
    loginUserController,
    profileController,
    deleteUserController,
    changeUserPasswordController,
}