const express = require("express")
const router = express.Router();
const subscription = require("../controllers/subscriptionController.js");
module.exports = app => {
    router.post("/addSubscription", subscription.addSubscription);
    router.get("/getSubscription", subscription.getSubscription);


 app.use('/api', router);
};