const express = require("express");
const path = require('path')
const app = express();
const webpush = require('web-push')
const schedule = require('node-schedule');
require('dotenv').config();
app.use(express.json());
const Scheduler = require('./models/Scheduler.js');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')))

const vapidKeys = {
  publicKey: process.env.PUBLIC_VAPID_KEY,
  privateKey: process.env.PRIVATE_VAPID_KEY,
}
//setting our previously generated VAPID keys
webpush.setVapidDetails(
  'mailto:myuserid@email.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
const sendNotification = (subscription, dataToSend) => {
  webpush.sendNotification(subscription, dataToSend)
}

Scheduler.getQuoteScheduleData((err, data) => {
  data.forEach(item => {
    let endpoint_data = JSON.parse(item.push_endpoint)
    //console.log(endpoint_data)   
    let title = item.quote_type_id == 1 ? 'Inspiring' : 'Health Alert'; 
    let qoute = item.quote_type_id == 1 ? 'Everything you can imagine is real.' : 'Good health is not something we can buy.';
    let interval = item.quote_type_id == 1 ? 2 : 1; 
    const notification = {
      title: title,
      body: qoute
    };
      schedule.scheduleJob('0 */'+interval+' * * *', async () => {
        sendNotification(endpoint_data, JSON.stringify(notification))
        //res.json({ message: 'message sent' })
      })

  }); 
});

Scheduler.getReminderData((err, data) => {
  data.forEach(item => {
    let endpoint_data = JSON.parse(item.push_endpoint)
    //console.log(endpoint_data)   

    let break_interval = item.break_interval_reminder; 
    const break_notification = {
      title: 'Break Reminder',
      body: 'Its time to take break. Have tea..!',
      icon:'break.png'
    };
    schedule.scheduleJob('*/' + break_interval + ' * * * *', async () => {
      sendNotification(endpoint_data, JSON.stringify(break_notification))
      //res.json({ message: 'message sent' })
    });

    const water_notification = { 
      title: 'Water Intake Reminder',
      body: 'Thirsty may have a glass of water..!',
      icon:'break.png'
    };
    let water_interval = item.water_intake_reminder; 
    schedule.scheduleJob('*/' + water_interval + ' * * * *', async () => {
      sendNotification(endpoint_data, JSON.stringify(water_notification))
      //res.json({ message: 'message sent' })
    });    
  }); 
});

app.get('/', (req, res) => res.render('login'))
app.get("/register", (req, res) => res.render("register"));
app.get("/success", (req, res) => res.render("success"));
app.get("/dashboard", (req, res) => res.render("dashboard"));

require('./router/quotes.js')(app);
require('./router/user.js')(app);
require('./router/subscription.js')(app);

module.exports = app;
