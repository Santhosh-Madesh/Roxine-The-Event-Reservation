
const router = require("express").Router();

const {
    createEventController,
    retriveAllEventController,
    retriveEventByNameController,
} = require("../controllers/eventOrganiserControllers");

const {
    bodyValidatorMiddleware,
    paramValidatorMiddleware,
} = require("../middlewares/validatorMiddleware")

const {
    eventValidation,
    retriveEventValidation,
} = require("../validators/eventValidator");

const {
    authenticateUser,
    authorizeOrganiser,
} = require("../middlewares/authMiddleware")

router.post("/event", authenticateUser, authorizeOrganiser, bodyValidatorMiddleware(eventValidation) ,createEventController);
router.get("/event", authenticateUser, retriveAllEventController);
router.get("/event/:name", authenticateUser, paramValidatorMiddleware(retriveEventValidation, "name") ,retriveEventByNameController)


module.exports = router;