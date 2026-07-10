const zod = require('zod');
const mongoose = require('mongoose');


const eventValidation = zod.object({
    name: zod.string().min(5, "Invalid event name"),
    date : zod.iso.date("Invalid date"),
    duration : zod.number("Invalid number").positive(),
    description : zod.string().min(25, "Invalid description"),
    available_tickets : zod.number().positive(),
    cost : zod.number().positive()
})

const retriveEventValidation = zod.object({
    name: zod.string().min(5, "Invalid event name")
})

const filterQueryValidation = zod.object({
    name: zod.string().min(5, "Invalid event name").optional(),
    date: zod.iso.date().optional("2026-06-23"),
    cost: zod.coerce.number().default(150)
})

const paginationQueryValidation = zod.object({
    offset: zod.coerce.number().nonnegative().default(0),
    limit: zod.coerce.number().positive("query must be a postitive number").default(1),
})

const eventIdValidation = zod.object({
    eventId: zod.string().refine(
        (val)=>mongoose.Types.ObjectId.isValid(val),
        "Invalid event Id detected"
    )
})

const billReqValidation = zod.object({
    event_id: zod.string().refine(
        (val)=>mongoose.Types.ObjectId.isValid(val),
        "Invalid event Id detected"
    ),
    no_of_tickets: zod.number().positive().default(1),
})

const bookValidation = zod.object({
    event_id: zod.string().refine(
        (val)=>mongoose.Types.ObjectId.isValid(val),
        "Invalid event Id detected"
    ),
    no_of_tickets: zod.number().positive().default(1),
    amount: zod.number().positive()
})

const searchValidation = zod.object({
    search: zod.string().regex(/^[a-zA-Z0-9]+$/)
})


module.exports = {
    eventValidation,
    retriveEventValidation,
    filterQueryValidation,
    paginationQueryValidation,
    eventIdValidation,
    billReqValidation,
    bookValidation,
    searchValidation,
}