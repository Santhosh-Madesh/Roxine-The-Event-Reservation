const {
    createEvent,
    retriveAllEvents,
    retriveEventByName,
    retriveEventFilter,
} = require("../models/eventOrganiserModels");

const eventObjectCreate = require("../utils/eventObjectCreate");

const createError = require("http-errors");



const createEventController = async(req, res, next)=>{

    try{

        const { name, date, duration, description, photo=undefined, available_tickets, cost} = req.validatedData;


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


const retriveAllEventController = async(req, res, next)=>{

    try{

        const result = await retriveAllEvents();
        
        if(!result && result === false){
            return next(createError(500, "Internal Server Error"))
        }

        if(!result){
            return next(createError(404, "Data not found"));
        }

        res.json({
            success: true,
            message: "Event data retrieved successfully!",
            data : result
        });


    } catch(error){
        next(error);
    }
}

const retriveEventByNameController = async(req, res, next) => {

    try{

        const { name } = req.validatedData;

        const event = await retriveEventByName(name);

        if(event.length == 0){
            return next(createError(404, "Data Not Found"));
        }

        res.json({
            success: true,
            message: "Data retrieved successfully!",
            data: event
        })

    } catch(error){
        next(error);
    }
}


const retriveEventFilterController = async(req, res, next) => {

    try{

        const filter = req.validatedData;

        const filteredEvent = await retriveEventFilter(filter);

        if(filteredEvent.length == 0){
            return next(createError(404, "Data not found"));
                }

        res.json(
            {
                success: true,
                message: "Data filtered and retrived successfully!",
                data: filteredEvent
            }
        )


    } catch(error){
        next(error);
    }
}

module.exports = {
    createEventController,
    retriveAllEventController,
    retriveEventByNameController,
    retriveEventFilterController,
}