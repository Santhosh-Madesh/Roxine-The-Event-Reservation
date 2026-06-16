
const router = require("express").Router();

const {
    createEventController,
} = require("../controllers/eventOrganiserControllers");


router.post("/event", createEventController);


module.exports = router;