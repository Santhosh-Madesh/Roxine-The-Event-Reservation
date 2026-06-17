
const router = require("express").Router();

const {
    createEventController,
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


module.exports = router;