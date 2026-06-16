
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


module.exports = {
    createEvent,
}