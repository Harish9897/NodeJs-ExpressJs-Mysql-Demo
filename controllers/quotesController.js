const Quotes = require('../models/Quotes.js');

// get all Quotes
exports.getAllQuotes = (req, res) => {
  Quotes.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Something went wrong!."
      });
    else res.send(data);
  });
};
