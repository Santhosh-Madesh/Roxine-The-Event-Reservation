const router = require('express').Router();

const {
    createOrganiserController,
    updateOrganiserController,
    deleteOrganiserController
} = require("../controllers/organisationControllers");

const {
    authenticateUser,
    authorizeOrganisation,
} = require("../middlewares/authMiddleware")

const {
    bodyValidatorMiddleware,
} = require("../middlewares/validatorMiddleware");

const {
    authValidation,
} = require("../validators/userValidator");



router.post("/organiser", authenticateUser, authorizeOrganisation, bodyValidatorMiddleware(authValidation) ,createOrganiserController);
router.put("/organiser", authenticateUser, authorizeOrganisation, updateOrganiserController);
router.delete("/organiser", authenticateUser, authorizeOrganisation, deleteOrganiserController);





module.exports = router;

