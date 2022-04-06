const sql = require("./db.js");

// constructor
const Subscription = function(subscription) {
 
};

Subscription.addSubscription = (subscription, result) => {

        subscription['created_at'] = new Date();
        subscription['updated_at'] = new Date();
        sql.query("INSERT INTO user_push_subscription SET ?", subscription, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("reminder added: ", { id: res.insertId, ...subscription });
        result(null, { id: res.insertId, ...subscription,msg:'success' });
        });
 }
   
Subscription.getSubscription = (user_id,result) => {

  sql.query("SELECT * FROM user_push_subscription WHERE user_id = ?",[user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("reminder: ", res);
    result(null, res);
  });
}
module.exports = Subscription;