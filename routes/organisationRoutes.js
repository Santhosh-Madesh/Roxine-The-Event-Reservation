const router = require("express").Router();

const {
    requestOrganisationController,
    organisationStatusController,
    updateOrganisationRequest,
} = require("../controllers/eventOrganiserControllers");

const {
    authenticateUser,
    authorizeAdmin,
} = require("../middlewares/authMiddleware");

const {
    bodyValidatorMiddleware,
} = require("../middlewares/validatorMiddleware")

const {
    organisationReqValidation,
    orgReqUpdateValidation,
} = require("../validators/organisationValidator");


router.post("/request", authenticateUser, bodyValidatorMiddleware(organisationReqValidation), requestOrganisationController);
router.get("/request/status", authenticateUser, organisationStatusController);
router.put("/request/update", authenticateUser, authorizeAdmin, bodyValidatorMiddleware(orgReqUpdateValidation), updateOrganisationRequest);


module.exports = router;