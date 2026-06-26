
const eventModel = require("../db/schemas/eventSchema");



const createEvent = async(event) => {

    try{

        if(event.photo){

            const eventObj =  await eventModel.create({
            name: event.name,
            date: event.date,
            duration: event.duration,
            description: event.description,
            available_tickets: event.available_tickets,
            cost: event.cost,
            photo: event.photo
        })

         return eventObj;

        } else {

            const eventObj =  await eventModel.create({
            name: event.name,
            date: event.date,
            duration: event.duration,
            description: event.description,
            available_tickets: event.available_tickets,
            cost: event.cost,
        })

         return eventObj;

        }



    } catch(error){
        console.log(`Error occured at the createEvent model, error: ${error}`);
        return false;
    }
}


const retriveAllEvents = async() => {

    try{


        const data = await eventModel.find();

        return data;


    } catch(error){
        console.log(`Error occured at the retriveAllEvents model, Error: ${error}`);
        return false;
    }
}

const retriveEventByName = async(eventName) => {

    try{

        const event = await eventModel.find({name:eventName});

        return event;

    } catch(error){
        console.log(`Error occured at the retriveEventByName model, Error: ${error}`);
        return false;
    }
}

const retriveEventFilter = async(filter) => {

    try{

        const filteredEvents = await eventModel.find(filter);

        return filteredEvents;

    } catch(error){
        console.log(`Error occured at the retriveEventFilter model, Error: ${error}`);
        return false;
    }
}

const retrivePaginatedEvent = async(limit, offset)=>{

    try{
        
        const paginatedEvents = await eventModel.find().limit(limit).skip(offset);
        
        
        return paginatedEvents;

    } catch(error){

        console.log(`Error occured at retrivePaginatedEvent model, error:${error}`);
        return false;
    }

    
}

const deleteEventById = async(id)=>{

    try{

        const deletedEvent = await eventModel.deleteOne({_id:id});

        return deletedEvent;


    } catch(error){
        console.log(`Error occurred at deleteEventById model, error:${error}`);
        return false;
    }
}


module.exports = {
    createEvent,
    retriveAllEvents,
    retriveEventByName,
    retriveEventFilter,
    retrivePaginatedEvent,
    deleteEventById,
}