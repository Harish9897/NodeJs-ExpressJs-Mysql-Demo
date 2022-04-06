const sql = require("./db.js");

// constructor
const User = function(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.created_at = new Date();
    this.updated_at = new Date();    
};
User.register = (newUser, result) => {
    sql.query("SELECT * FROM user WHERE email=?", [newUser.email], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);      
            return;
        }
        if (res.length) {
            //console.log("user detail: ", res[0]);
            result(null,{ msg: "user_exist" });
            return;
        }
        else {
            sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }

                console.log("created user: ", { id: res.insertId, ...newUser });
                result(null, { id: res.insertId, ...newUser });
            });
        }    
    });     
};

User.login = (user, result) => {
  sql.query(`SELECT id, name, email,start_hour,end_hour FROM user WHERE email=? AND password=?`,[user.email,user.password], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("user detail: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found 
    result(null,{ msg: "not_found" });
  });
};

User.addWorkHours = (user, result) => {
    sql.query("UPDATE user SET  start_hour =?, end_hour =? WHERE id = ?",
        [user.start_hour, user.end_hour, user.user_id], (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }

    console.log("user hour added: ");
    result(null, { id: user.user_id, start_hour:user.start_hour,end_hour:user.end_hour,msg:'success' });
});
}
User.addReminder = (reminder, result) => {

    sql.query(`SELECT id FROM user_preferences WHERE user_id=?`, [reminder.user_id], (err, res_select) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res_select.length) {
            reminder['updated_at'] = new Date();
            sql.query("UPDATE user_preferences SET  break_reminder_interval =?, water_intake_interval =?,updated_at=? WHERE user_id = ?",
                [reminder.break_reminder_interval, reminder.water_intake_interval,
                    reminder.updated_at, reminder.user_id],
                (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                    }
                result(null, { id: res_select[0].id, ...reminder,msg:'success' });    
            });
        
    }
    else
    {
        reminder['created_at'] = new Date();
        reminder['updated_at'] = new Date();
        sql.query("INSERT INTO user_preferences SET ?", reminder, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("reminder added: ", { id: res.insertId, ...reminder });
        result(null, { id: res.insertId, ...reminder,msg:'success' });
        });
       }
    });    

}
User.getReminders = (user_id,result) => {

  sql.query("SELECT * FROM user_preferences WHERE user_id = ?",[user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("reminder: ", res);
    result(null, res);
  });
}
User.subscribeInspirationalQuote = (in_qoute, result) => {

    sql.query(`SELECT id FROM user_quote_subscription WHERE user_id=? AND quote_type_id =?`,
        [in_qoute.user_id,in_qoute.quote_type_id],
        (err, res_select) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res_select.length) {
            in_qoute['updated_at'] = new Date();
            sql.query("UPDATE user_quote_subscription SET  status =?,updated_at =? WHERE user_id = ? AND quote_type_id =?",
                [in_qoute.status,in_qoute.updated_at, in_qoute.user_id,in_qoute.quote_type_id],
                (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                    }
                result(null, {msg:'success' });    
            });
        
    }
    else
    {
        in_qoute['created_at'] = new Date();
        in_qoute['updated_at'] = new Date();
        sql.query("INSERT INTO user_quote_subscription SET ?", in_qoute, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("quote subscription added: ");
        result(null, {msg:'success' });
        });
       }
    });    

}
User.subscribeHealthQuote = (health_qoute, result) => {
    sql.query(`SELECT id FROM user_quote_subscription WHERE user_id=? AND quote_type_id=?`,
        [health_qoute.user_id, health_qoute.quote_type_id],
        (err, res_select) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res_select.length) {
            health_qoute['updated_at'] = new Date();
            sql.query("UPDATE user_quote_subscription SET  status =?,updated_at =? WHERE user_id = ? AND quote_type_id =?",
                [health_qoute.status,health_qoute.updated_at, health_qoute.user_id,health_qoute.quote_type_id],
                (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                    }
                result(null, {msg:'success' });    
            });
        
    }
    else
    {
        in_qoute['created_at'] = new Date();
        in_qoute['updated_at'] = new Date();
        sql.query("INSERT INTO user_quote_subscription SET ?", in_qoute, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("quote subscription added: ");
        result(null, {msg:'success' });
        });
       }
    });    

}
User.getQuoteSettings = (user_id,result) => {

  sql.query("SELECT * FROM user_quote_subscription WHERE user_id = ? AND status=1",[user_id], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("reminder: ", res);
    result(null, res);
  });
}
module.exports = User;