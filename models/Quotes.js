const sql = require("./db.js");

// constructor
const Quotes = function() {

};

Quotes.getAll = (result) => {
  sql.query("SELECT * FROM quote WHERE status = 1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("quote: ", res);
    result(null, res);
  });
};

module.exports = Quotes;
