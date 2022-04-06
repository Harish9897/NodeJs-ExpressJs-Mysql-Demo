const express = require("express")
const router = express.Router();
const quotes = require("../controllers/quotesController.js");
module.exports = app => {
router.get("/getQuotes", quotes.getAllQuotes);
//router.route('/register').post(register)
//router.route('/register').post(login)

 app.use('/api', router);
};