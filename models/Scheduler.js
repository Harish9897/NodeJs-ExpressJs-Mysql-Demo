const sql = require("./db.js");

// constructor
const Scheduler = function() {

};

Scheduler.getQuoteScheduleData = (result) => {
  sql.query("SELECT DISTINCT(ups.push_endpoint), uqs.user_id, uqs.quote_type_id  FROM user_push_subscription AS ups, user_quote_subscription AS uqs WHERE uqs.user_id = ups.user_id AND uqs.status =1", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("quote: ", res);
    result(null, res);
  });
};

Scheduler.getReminderData = (result) => {
  sql.query("SELECT DISTINCT(ups.push_endpoint), up.user_id, up.break_reminder_interval,up.water_intake_interval  FROM user_push_subscription AS ups, user_preferences AS up WHERE up.user_id = ups.user_id", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("quote: ", res);
    result(null, res);
  });
};
module.exports = Scheduler;
