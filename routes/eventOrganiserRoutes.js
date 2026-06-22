
const router = require("express").Router();

const {
    createEventController,
    retriveAllEventController,
    retriveEventByNameController,
    retriveEventFilterController,
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
} = require("../validators/eventValidator");

const {
    authenticateUser,
    authorizeOrganiser,
} = require("../middlewares/authMiddleware")

router.post("/event", authenticateUser, authorizeOrganiser, bodyValidatorMiddleware(eventValidation) ,createEventController);
router.get("/event", authenticateUser, retriveAllEventController);
router.get("/event/:name", authenticateUser, paramValidatorMiddleware(retriveEventValidation, "name") ,retriveEventByNameController);
router.get("/event/filter/query", authenticateUser, queryValidatorMiddleware(filterQueryValidation), retriveEventFilterController);



module.exports = router;