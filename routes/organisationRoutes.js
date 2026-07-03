const router = require("express").Router();

const {
    requestOrganisationController,
    organisationStatusController,
    
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
router.get("/request/status", authenticateUser, organisationStatusController);

module.exports = router;