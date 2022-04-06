const User = require('../models/User.js');

//login
exports.login = (req, res) => {  
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
        message: "Email or Password not present",
        });
    }    
    User.login(new User(req.body),(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Something went wrong!. Try later."
            });
        else {
            console.log(data)
            res.send(data);

        }    
  });
};

exports.register = (req, res) => {  
    const { email } = req.body;
    console.log(req.body)
    User.register(new User(req.body),(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Something went wrong!. Try later."
            });
        else {
            console.log(data)
            res.send(data);

        }    
  });
};
exports.addWorkHours = (req, res) => {  
    //const { id, start_hour, end_hour } = req.body;
    console.log(req.body)
    User.addWorkHours(req.body,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Something went wrong!. Try later."
            });
        else {
            console.log(data)
            res.send(data);

        }    
  });
};

exports.addReminder = (req, res) => {  
    console.log(req.body)
    User.addReminder(req.body,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Something went wrong!. Try later."
            });
        else {
            console.log(data)
            res.send(data);

        }    
  });
};

exports.getReminders = (req, res) => {  
    let { user_id } = req.body;
    console.log(req.body)    
    User.getReminders(user_id,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Something went wrong!. Try later."
            });
        else {
            //console.log(data)
            res.send(data);

        }    
  });
};

exports.subscribeInspirationalQuote = (req, res) => {  
    console.log(req.body)
    User.subscribeInspirationalQuote(req.body,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Something went wrong!. Try later."
            });
        else {
            console.log(data)
            res.send(data);

        }    
  });
};

exports.subscribeHealthQuote = (req, res) => {  
    console.log(req.body)
    User.subscribeHealthQuote(req.body,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Something went wrong!. Try later."
            });
        else {
            console.log(data)
            res.send(data);

        }    
  });
};

exports.getQuoteSettings = (req, res) => {
    
    User.getQuoteSettings(req.body, (err, data) => {
        if (err)
            res.status(500).send({ message: err.message || "Somthing went wrong!. Try later!!" })
        else
            res.send(data)
    });  
};