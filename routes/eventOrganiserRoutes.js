
const router = require("express").Router();

const {
    createEventController,
    retriveAllEventController,
} = require("../controllers/eventOrganiserControllers");

const {
    bodyValidatorMiddleware,
} = require("../middlewares/validatorMiddleware")

const {
    eventValidation,
} = require("../validators/eventValidator");

const {
    authenticateUser,
    authorizeOrganiser,
} = require("../middlewares/authMiddleware")

router.post("/event", authenticateUser, authorizeOrganiser, bodyValidatorMiddleware(eventValidation) ,createEventController);
router.get("/event", authenticateUser, retriveAllEventController);


module.exports = router;