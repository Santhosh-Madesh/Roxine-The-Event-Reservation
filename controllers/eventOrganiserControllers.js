const {
    createEvent,
    retriveAllEvents,
    retriveEventByName,
    retriveEventFilter,
    retrivePaginatedEvent,
    deleteEventById,
    updateEventById,
} = require("../models/eventOrganiserModels");

const eventObjectCreate = require("../utils/eventObjectCreate");

const createError = require("http-errors");



const createEventController = async(req, res, next)=>{

    try{

        const { name, date, duration, description, photo=undefined, available_tickets, cost} = req.validatedBodyData;

        const ownership = req.userId;

        const eventObject = eventObjectCreate(name, date, duration, description, available_tickets, cost, photo, ownership);

        const event = await createEvent(eventObject);

        if(!event){
            return next(createError(500, "Internal servver error"));
        }

        res.status(201).json({
            success: true,
            message: "Event data created succeessfully",
            data: {
                name: event.name,
                date: event.date,
                duration: event.duration,
                description: event.description,
                available_tickets: event.available_tickets,
                cost: event.cost
            }
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

        const { name } = req.validatedParamData;

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

        const filter = req.validatedQueryData;

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


const retrivePaginatedEventController = async(req, res, next)=>{

    try{

        const { page } = req.validatedParamData;

        const limit = 10;
        const offset = (page-1)*limit;

        const paginatedData = await retrivePaginatedEvent(limit, offset);

        if(paginatedData.length == 0){
            return next(createError(404, "Data not found"))
        }

        res.json({
            success: true,
            message: "Retrived paginated data successfully",
            data: paginatedData,
            prev: page == 1 ? null : `/paginate/event?page=${page-1}`,
            next: `/paginate/event?page=${page+1}`
        })


    } catch(error){
        next(error);
    }
}


const deleteEventByIdController = async(req, res, next)=>{
    
    try{

        const { eventId } = req.validatedParamData;

        const deleteResult = await deleteEventById(eventId);


        if(!deleteResult){
            return next(createError(500, "Internal server error"));
        }
        
        res.status(204).send();

    } catch(error){
        next(error);
    }
}

const updateEventByIdController = async(req, res, next)=>{

    try{

        
        const {  name, date, duration, description, photo=undefined, available_tickets, cost} = req.validatedBodyData;
        const { eventId } = req.validatedParamData;

        const ownership = req.userId;

        const eventObj = eventObjectCreate(name, date, duration, description, available_tickets, cost, photo, ownership);

        const updatedEvent = await updateEventById(eventId, eventObj);

        if(!updatedEvent){
            return next(createError(500, "Internal server error"));
        }

        res.status(204).send();


    }catch(error){
        next(error);
    }
}

module.exports = {
    createEventController,
    retriveAllEventController,
    retriveEventByNameController,
    retriveEventFilterController,
    retrivePaginatedEventController,
    deleteEventByIdController,
    updateEventByIdController,
}