const router = require("express").Router();

const {
    retriveAllEventController,
    retriveEventFilterController,
    retriveEventByNameController,
    retrivePaginatedEventController,
    generateBillController,
    bookTicketsController,
    searchEventByNameController,
} = require("../controllers/eventOrganiserControllers")

const {
    paramValidatorMiddleware,
    queryValidatorMiddleware,
    bodyValidatorMiddleware
} = require('../middlewares/validatorMiddleware');

const {
    retriveEventValidation,
    filterQueryValidation,
    paginationQueryValidation,
    billReqValidation,
    bookValidation,
    searchValidation,
} = require("../validators/eventValidator");

const {
    authenticateUser,
} = require("../middlewares/authMiddleware")


router.get("/", authenticateUser, retriveAllEventController);
router.get("/:name", authenticateUser, paramValidatorMiddleware(retriveEventValidation) ,retriveEventByNameController);
router.get("/filter/query", authenticateUser, queryValidatorMiddleware(filterQueryValidation), retriveEventFilterController);
router.get("/paginate/event", authenticateUser, queryValidatorMiddleware(paginationQueryValidation)  ,retrivePaginatedEventController);
router.post("/bill", authenticateUser, bodyValidatorMiddleware(billReqValidation) ,generateBillController);
router.post("/payment", authenticateUser, bodyValidatorMiddleware(bookValidation) ,bookTicketsController);
router.get("/filter/search", authenticateUser, queryValidatorMiddleware(searchValidation), searchEventByNameController);

module.exports = router;