const zod = require('zod');


const eventValidation = zod.object({
    name: zod.string().min(5, "Invalid event name"),
    date : zod.iso.date("Invalid date"),
    duration : zod.number("Invalid number").positive(),
    description : zod.string().min(25, "Invalid description"),
    photo : zod.string().min(5, "Invalid photo directory").optional(),
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
    page: zod.coerce.number().default(1),
})


module.exports = {
    eventValidation,
    retriveEventValidation,
    filterQueryValidation,
    paginationQueryValidation,
}