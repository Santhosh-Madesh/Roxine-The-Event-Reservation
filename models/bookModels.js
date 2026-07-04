
const bookModel = require("../db/schemas/bookSchema");



const createBook = async(book) => {

    try{

        const booked = await bookModel.create({
            event_id: book.eventId,
            user_id: book.userId,
            tickets: book.tickets,
            token: book.token
        });

        return booked;

    } catch(error) {
        console.log(`Error occurred at the createBook model functiion, error:${error}`);
        return false;
    }
}


module.exports = {
    createBook,
}