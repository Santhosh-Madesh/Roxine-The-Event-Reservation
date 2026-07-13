const {
    createOrganiser,
    updateOrganiser,
    deleteOrganiser
} = require("../models/organisationUserModel")

const bcrypt = require("bcrypt");

const createError = require("http-errors")




const createOrganiserController = async(req, res, next) => {

    try{

        const { name, email, password } = req.validatedBodyData;

        const hashedPassword = await bcrypt.hash(password, 10);

        const dataObj = {
            name: name,
            email: email,
            password: hashedPassword
        };

        const organiser = await createOrganiser(dataObj);

        if(!organiser){
            return next(createError(500, "Internal server error"))
        }

        res.status(201).json({
            success: true,
            message: "Organiser created successfully",
            data: {
                name: organiser.name,
                email: organiser.email
            }
        })


    } catch(error){
        next(error);
    }
}

const updateOrganiserController = async(req, res, next) => {

    try{

        const { orgId, dataObj } = req.validatedBodyData;

        const updatedOrganiser = await updateOrganiser(orgId, dataObj);

        if(!updatedOrganiser){
            return next(createError(500, "Internal server error"));
        }

        res.status(204).send();

    } catch(error) {
        next(error);
    }
}

const deleteOrganiserController = async(req, res, next) =>{

    try{

        const { orgId } = req.validatedBodyData;

        const deletedOrganiser = await deleteOrganiser(orgId);

        if(!deletedOrganiser){
            return next(createError(500, "Internal server error"));
        }

        res.status(204).send();

    } catch(error) {
        next(error)
    }
} 


module.exports = {
    createOrganiserController,
    updateOrganiserController,
    deleteOrganiserController,
}