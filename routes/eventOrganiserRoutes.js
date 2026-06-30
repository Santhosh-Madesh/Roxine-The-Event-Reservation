
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
router.get("/event", authenticateUser, retriveAllEventController);
router.get("/event/:name", authenticateUser, paramValidatorMiddleware(retriveEventValidation) ,retriveEventByNameController);
router.get("/event/filter/query", authenticateUser, queryValidatorMiddleware(filterQueryValidation), retriveEventFilterController);
router.get("/paginate/event", authenticateUser, queryValidatorMiddleware(paginationQueryValidation)  ,retrivePaginatedEventController);
router.delete("/event/:eventId", authenticateUser, authorizeOrganiser, paramValidatorMiddleware(eventIdValidation), authorizeOwner ,deleteEventByIdController);
router.put("/event/:eventId", authenticateUser, authorizeOrganiser, paramValidatorMiddleware(eventIdValidation), authorizeOwner, bodyValidatorMiddleware(eventValidation), updateEventByIdController);
router.post("/event/bill", authenticateUser, bodyValidatorMiddleware(billReqValidation) ,generateBillController);
router.post("/event/payment", authenticateUser, bodyValidatorMiddleware(bookValidation) ,bookTicketsController);

module.exports = router;