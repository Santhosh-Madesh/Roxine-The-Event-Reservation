

const eventObjectCreate = (name, date, duration, description, available_tickets, cost, photo=undefined) => {

    const event = {
        name: name,
        date: date,
        duration: duration,
        description: description,
        available_tickets: available_tickets,
        cost: cost,
        photo: photo
    }

    return event;

}



module.exports = eventObjectCreate;