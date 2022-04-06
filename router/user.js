const express = require("express")
const router = express.Router();
const user = require("../controllers/userController.js");
module.exports = app => {
    router.post("/login", user.login);
    router.post("/register", user.register);
    router.post("/addWorkHours", user.addWorkHours);
    router.post("/addReminder", user.addReminder);
    router.post("/getReminders", user.getReminders);
    router.post("/subscribeInspirationalQuote", user.subscribeInspirationalQuote);
    router.post("/subscribeHealthQuote", user.subscribeHealthQuote);
    router.post("/getQuoteSettings", user.getQuoteSettings);

 app.use('/api', router);
};