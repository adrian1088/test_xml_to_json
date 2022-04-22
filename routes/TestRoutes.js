const router = require("express").Router();

// Controllers
const { 
    testFunction, 
} = require("../controllers/TestController");

// Routes
router.post("/test", testFunction);

module.exports = router;