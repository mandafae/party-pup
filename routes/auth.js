require('dotenv').load();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised');
const knex = require('../db/knex');
const cookies = require('ng2-cookies')

router.post('/login', (req, res, next) => {
  console.log("IN THE ROUTE!");
  console.log("req.body:", req.body);
  knex('users')
  .where({username: req.body.username})
  .first()
  .then(user => bcrypt.compare(req.body.password,user.hash)
    .then(valid => {
      if(valid) {
        console.log("EXPRESS USER:", user);
        res.json(user)
      }
  }).catch( (invalid) => {
    console.log("ERROR");
  }))
})

router.post('/facebook/:id', (req, res, next) => {
  console.log("req.body:", req.body);
  knex('users')
  .returning('*')
  .where({FB_id: req.params.id})
  .first()
  .then(user => {
    console.log("EXPRESS USER:", user);
    res.json(user)
  })
})

router.post('/google/:id', (req, res, next) => {
  console.log("req.body:", req.body);
  knex('users')
  .returning('*')
  .where({google_id: req.params.id})
  .first()
  .then(user => {
    console.log("EXPRESS USER:", user);
    res.json(user)
  })
})

// // Facebook Strategy config
// //console.log("FACEBOOK STRATEGY!");
// passport.use(new FacebookStrategy({
//     clientID: process.env.FBclientID,
//     clientSecret: process.env.FBclientSecret,
//     callbackURL: "http://localhost:8080/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, done) {
//     //console.log("I'M IN THE FUNCTION!");
//     //console.log("FB PROFILE:", profile);
//     knex('users')
//     .where({FB_id: profile.id})
//     .first()
//     .then(user => {
//       //console.log("USER:", user);
//       done(null,user);
//     });
//   }
// ));

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
//   //console.log("DESERIALIZE");
//   //console.log("DESERIALIZE ID:", id);
//   knex('users')
//   .where({id: id})
//   .first()
//   .then(user => {
//     done(null,user);
//   });
// });

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


// // Facebook route
// router.get('/facebook', passport.authenticate('facebook'));
//
// // router.get('/facebook/callback',
// //   passport.authenticate('facebook'), (req,res)=>{
// //     console.log(res);
// //     res.json(res.req.user)
// //   });
//
//   router.get('/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.cookie('test', JSON.stringify(req.session.passport)) // access cookies in angular
//     // console.log("res.cookie", res.cookie);
//     // console.log("req.session", req.session);
//     let redirectUrl = `/${res.req.user.id}/dashboard`;
//     console.log(res.req.user);
//     res.redirect(redirectUrl);
//     //res.json(res.req.user);
//   });
//
// // Twitter route
// router.get('/auth/twitter', passport.authenticate('twitter'));
//
// router.get('/auth/twitter/callback',
//   passport.authenticate('twitter', { successRedirect: '/',
//                                      failureRedirect: '/login' }));
//
// // Google route
// router.get('/auth/google',
//   passport.authenticate('google', { scope: 'https://www.google.com/m8/feeds' });
//
// router.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

module.exports = router;
