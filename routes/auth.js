require('dotenv').load();
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const passport = require('passport');
const OAuthStrategy = require('passport-oauth').OAuthStrategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;

// router.post('/login', (req, res, next) => {
//   console.log("IN THE ROUTE!");
//   knex('users')
//   .where({username: req.body.username})
//   .first()
//   .then(user => {
//     console.log(user);
//     res.json(user)
//   });
// })

// Facebook Strategy config
console.log("FACEBOOK STRATEGY!");
passport.use(new FacebookStrategy({
    clientID: process.env.FBclientID,
    clientSecret: process.env.FBclientSecret,
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("I'M IN THE FUNCTION!");
    console.log("FB PROFILE:", profile);
    knex('users')
    .where({FB_id: profile.id})
    .first()
    .then(user => {
      console.log("USER:", user);
      done(null,user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  console.log("DESERIALIZE");
  console.log("DESERIALIZE ID:", id);
  knex('users')
  .where({id: id})
  .first()
  .then(user => {
    console.log(user);
    done(null,user);
  });
});

// Twitter Strategy config
// passport.use(new TwitterStrategy({
//     consumerKey: TWITTER_CONSUMER_KEY,
//     consumerSecret: TWITTER_CONSUMER_SECRET,
//     callbackURL: "http://www.example.com/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     User.findOrCreate(..., function(err, user) {
//       if (err) { return done(err); }
//       done(null, user);
//     });
//   }
// ));

// Google Strategy config
// passport.use(new GoogleStrategy({
//     consumerKey: GOOGLE_CONSUMER_KEY,
//     consumerSecret: GOOGLE_CONSUMER_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//       User.findOrCreate({ googleId: profile.id }, function (err, user) {
//         return done(err, user);
//       });
//   }
// ));


// Facebook route
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/dashboard',
                                      failureRedirect: '/' }));
//
// // Twitter route
// router.get('/auth/twitter', passport.authenticate('twitter'));
//
// router.get('/auth/twitter/callback',
//   passport.authenticate('twitter', { successRedirect: '/',
//                                      failureRedirect: '/login' }));
//
// // Google route
// app.get('/auth/google',
//   passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' });
//
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

module.exports = router;
