
const router = require("express").Router();

const {
    createEventController,
    retriveAllEventController,
    retriveEventByNameController,
    retriveEventFilterController,
    retrivePaginatedEventController,
    deleteEventByIdController,
    updateEventByIdController,
    generateBillController,
    bookTicketsController,
} = require("../controllers/eventOrganiserControllers");

const {
    bodyValidatorMiddleware,
    paramValidatorMiddleware,
    queryValidatorMiddleware,
} = require("../middlewares/validatorMiddleware")

const {
    eventValidation,
    retriveEventValidation,
    filterQueryValidation,
    paginationQueryValidation,
    eventIdValidation,
    billReqValidation,
    bookValidation,
} = require("../validators/eventValidator");

const {
    authenticateUser,
    authorizeOrganiser,
    authorizeOwner,
} = require("../middlewares/authMiddleware")

router.post("/event", authenticateUser, authorizeOrganiser, bodyValidatorMiddleware(eventValidation) ,createEventController);
router.delete("/event/:eventId", authenticateUser, authorizeOrganiser, paramValidatorMiddleware(eventIdValidation), authorizeOwner ,deleteEventByIdController);
router.put("/event/:eventId", authenticateUser, authorizeOrganiser, paramValidatorMiddleware(eventIdValidation), authorizeOwner, bodyValidatorMiddleware(eventValidation), updateEventByIdController);


module.exports = router;