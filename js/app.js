const express = require('express');
const app = express();
const Twit = require('Twit');
const config = require('../config.js');
const T = new Twit({
  consumer_key:         config.consumer_key,
  consumer_secret:      config.consumer_secret,
  access_token:         config.access_token,
  access_token_secret:  config.access_token_secret
});
const bodyParser = require('body-parser');

// app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'pug');

app.use("/", (req, res, next) => {
  console.log("Hello World");
  next();
});

T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
  console.log(data)
})

app.listen(3000, () => {
  console.log("application is running on port 3000");
});
