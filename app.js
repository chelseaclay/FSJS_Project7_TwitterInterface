const express = require('express');
const app = express();
const Twit = require('Twit');
const config = require('./config.js');
const T = new Twit({
  consumer_key:         config.consumer_key,
  consumer_secret:      config.consumer_secret,
  access_token:         config.access_token,
  access_token_secret:  config.access_token_secret
});
const bodyParser = require('body-parser');


const twitInfo = {};
  twitInfo.tweets = [];
  twitInfo.friends = [];
  twitInfo.dm = [];

// app.use(bodyParser.urlencoded({ extended: false }));

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

//Get my Twitter info and set up array to push to
T.get('account/verify_credentials', { skip_status: true })
.catch(function (err) {
  console.log('caught error', err.stack)
})
.then(function (result) {

  twitInfo.id = result.data.id;
  twitInfo.username = result.data.screen_name;
  twitInfo.name = result.data.name;
  twitInfo.following = result.data.friends_count;
  twitInfo.userImg = result.data.profile_image_url;
});

//Get my last 5 tweets and push to array set up previously
T.get('https://api.twitter.com/1.1/statuses/user_timeline.json', [user_id=twitInfo.id, count=5])
.catch(function (err) {
  console.log('caught error', err.stack)
})
.then(function (result) {
  for (var i = 0; i < result.data.length; i++) {
    var tweetData = {
      date: result.data[i].created_at,
      tweet: result.data[i].text,
      likes: result.data[i].favorite_count,
      retweets: result.data[i].retweet_count,
      idStr: result.data[i].id_str
    };
    twitInfo.tweets.push(tweetData);
  }
});

//Get my last 5 friends and push to array set up previously
T.get('https://api.twitter.com/1.1/friends/list.json', [user_id=twitInfo.id, count=5])
.catch(function (err) {
  console.log('caught error', err.stack)
})
.then(function (result) {
  for (var i = 0; i < result.data.users.length; i++) {
    var tweetDataFriends = {
      name: result.data.users[i].name,
      username: result.data.users[i].screen_name,
      userImg: result.data.users[i].profile_image_url,
    };
    twitInfo.friends.push(tweetDataFriends);
  }
});

//Get my last 5 DMs and push to array set up previously
T.get('https://api.twitter.com/1.1/direct_messages.json', [count=5])
.catch(function (err) {
  console.log('caught error', err.stack)
})
.then(function (result) {
  for (var i = 0; i < result.data.length; i++) {
    var tweetDataDM = {
      name: result.data[i].sender.name,
      username: result.data[i].sender.screen_name,
      userImg: result.data[i].sender.profile_image_url,
      message: result.data[i].text,
      time: result.data[i].created_at
    };
    twitInfo.dm.push(tweetDataDM);
  }
});

app.use("/", (req, res, next) => {
  res.render('index', {twitInfo});
  // console.log(twitInfo);
  next();
});

app.listen(3000, () => {
  console.log("application is running on port 3000");
});
