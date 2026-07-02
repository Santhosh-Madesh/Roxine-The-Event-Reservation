const router = require("express").Router();

const {
    requestOrganisationController,
} = require("../controllers/eventOrganiserControllers");

const {
    authenticateUser,
} = require("../middlewares/authMiddleware");

const {
    bodyValidatorMiddleware,
} = require("../middlewares/validatorMiddleware")

const {
    organisationReqValidation
} = require("../validators/organisationValidator");


router.post("/request", authenticateUser, bodyValidatorMiddleware(organisationReqValidation), requestOrganisationController);


module.exports = router;