const {
    createEvent,
} = require("../models/eventOrganiserModels");

const eventObjectCreate = require("../utils/eventObjectCreate");

const createError = require("http-errors");



const createEventController = async(req, res, next)=>{

    try{

        const { name, date, duration, description, photo=undefined, available_tickets, cost} = req.body;


        const eventObject = eventObjectCreate(name, date, duration, description, available_tickets, cost, photo);


        const event = await createEvent(eventObject);

        if(!event){
            return next(createError(500, "Internal servver error"));
        }

        res.status(201).json({
            success: true,
            message: "Event data created succeessfully",
            data: event
        })


    } catch(error){
        next(error);
    }

}

module.exports = {
    createEventController,
}