# Build a Twitter Interface
## FullStack JavaScript Project 7
### Node.JS, Express, Middleware, Socket.io, Jquery, Pug


* use Twitter’s REST API to access your Twitter profile information and render it to a user
* Show Your 5 most recent tweets, Your 5 most recent friends, Your 5 most recent private messages
* Make a Pug/Jade template for the main page
* Using Node and Express, request the data you need from Twitter’s API, render it in your template
* Add a section to the bottom of your page that allows a user to post a new tweet. The new tweet should display without having to refresh the page
* Add an error page to your application, so that if anything goes wrong with your routes, the user will see a friendly message rendered, instead of the default error code.
* Include your personal background image from Twitter as a background for the page header.

### Installation

```
$ npm install
$ npm start
```
### Please add your twitter access keys to the config example and rename it config
```
module.exports = {
    consumer_key: '',
    consumer_secret: '',
    access_token: '',
    access_token_secret: ''
};
