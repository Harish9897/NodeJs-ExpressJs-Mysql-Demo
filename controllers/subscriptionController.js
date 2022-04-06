const Subscription = require('../models/Subscription.js');




exports.addSubscription = (req, res) => {  
    console.log(req.body)
    Subscription.addSubscription(req.body,(err, data) => {
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

exports.getSubscription = (req, res) => {  
    let { user_id } = req.body;
    console.log(req.body)    
    Subscription.getSubscription(user_id,(err, data) => {
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