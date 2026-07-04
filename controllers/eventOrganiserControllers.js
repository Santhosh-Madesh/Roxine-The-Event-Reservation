const {
    createEvent,
    retriveAllEvents,
    retriveEventByName,
    retriveEventFilter,
    retrivePaginatedEvent,
    deleteEventById,
    updateEventById,
    retriveEventById,
    getEventsByNamePattern,
} = require("../models/eventOrganiserModels");

const {
    createOrgRequest,
    retriveOrgByUserId,
    updateOrgByUserId,
} = require("../models/organisationModels");

const {
    createBook,
} = require("../models/bookModels");


const generateToken = require("../utils/generateToken");
const eventObjectCreate = require("../utils/eventObjectCreate");
const generateBill = require("../utils/generateBill");

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

        const { offset, limit } = req.validatedQueryData;


        const paginatedData = await retrivePaginatedEvent(limit, offset);

        const url = req.url.split("?");

        const next_url = `${req.protocol}://${req.host}${req.baseUrl}${url[0]}?offset=${offset+limit}&limit=${limit}`;

        let prev_url = `${req.protocol}://${req.host}${req.baseUrl}${url[0]}?offset=${offset-limit}&limit=${limit}`;

        if(offset < limit){
            prev_url = `${req.protocol}://${req.host}${req.baseUrl}${url[0]}?offset=${0}&limit=${limit}`;
        }

        if(offset === 0){
            prev_url = null;
        }

        if(paginatedData.length == 0){
            return next(createError(404, "Data not found"))
        }

        

        res.json({
            success: true,
            message: "Retrived paginated data successfully",
            data: paginatedData,
            prev: prev_url,
            next: next_url
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

const generateBillController = async(req, res, next)=>{

    try{

        const { event_id, no_of_tickets } = req.validatedBodyData;

        const event = await retriveEventById(event_id);

        if(!event){
            return next(creatError(400, "Bad request! provide appropriate data"));
        }

        const cost_per_ticket = event.cost;
        const tax = 100;
        const platform_fee = 100;

        const billData = generateBill(no_of_tickets, cost_per_ticket, tax, platform_fee);

        res.json({
            success: true,
            message: "Bill generated successfully!",
            data: billData
        })



    } catch(error){
        next(error);
    }
}

const bookTicketsController = async(req, res, next)=>{

    try{

        const { event_id, no_of_tickets, amount } = req.validatedBodyData;

        const event = await retriveEventById(event_id);

        if(!event){
            return next(createError(400, "Bad request! provide appropriate data"));
        }

        const tax = 100;
        const platform_fee = 100;

        const billObj = generateBill(no_of_tickets, event.cost, tax, platform_fee);

        if(amount != billObj.total_fee){
            return next(createError(400, "Bad request! provide appropriate data"));
        }

        billObj.payment_status = "paid";

        const token = generateToken();

        const bookObj = {
            eventId: event_id,
            userId: req.userId,
            tickets: billObj.tickets,
            token: token
        }

        const book = await createBook(bookObj);

        if(!book){
            return next(createError(500, "Internal server error"));
        }

        res.json({
            success: true,
            message: "Tickets booked for the event successfully!",
            data:{
                event_data:{
                    name: event.name,
                    description: event.description,
                    duration: event.duration,
                    date: event.date
                },
                bill_data:billObj,
                bookData:{
                    token: book.token
                }
            }
        })

    }catch(error){
        next(error);
    }
} 

const searchEventByNameController = async(req, res, next) => {

    try{

        const { search } = req.validatedQueryData;

        const events = await getEventsByNamePattern(search);

        if(!events){
            return next(createError(404, "Data not found!"));
        }

        res.json({
            success: true,
            message: "Data retrived successfully!",
            data: events
        })


    } catch(error) {
        next(error);
    }
}

const requestOrganisationController = async(req, res, next)=>{

    try{

        const { name } = req.validatedBodyData;
        const userId = req.userId;

        const organisation = await createOrgRequest(name, userId);

        if(!organisation){
            return next(createError(500, "Internal server error"));
        }

        res.status(201).json({
            success: true,
            message: "Request submitted successfully!",
            data: {
                name: organisation.name,
                status: organisation.status
            }
        })

    } catch(error) {
        next(error);
    }
} 

const organisationStatusController = async(req, res, next) => {

    try{

        const userId = req.userId;

        const org = await retriveOrgByUserId(userId);

        if(!org){
            return next(createError(404, "Data not found"));
        }

        const status = org.status;

        res.json({
            success: true,
            message: "Request status retrived successfully",
            data:{
                status: status
            }
        })

    } catch(error){
        next(error);
    }
}

const updateOrganisationRequest = async(req, res, next)=> {

    try{

        const { newObj, userId } = req.validatedBodyData;

        const updatedOrg = await updateOrgByUserId(userId, newObj);

        if(!updatedOrg){
            return next(createError(500, "Internal server error"));
        }

        res.status(204).send();

    } catch(error) {
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
    generateBillController,
    bookTicketsController,
    searchEventByNameController,
    requestOrganisationController,
    organisationStatusController,
    updateOrganisationRequest,
}