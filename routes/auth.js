require('dotenv').load();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised');
const knex = require('../db/knex');
const cookies = require('ng2-cookies')

router.post('/login', (req, res, next) => {
  console.log("REGULAR SIGN IN ROUTE!");
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
  console.log("FB SIGN IN ROUTE")
  console.log("req.body:", req.body);
  knex('users')
  .select('id', 'username', 'first_name', 'last_name', 'street_address', 'city', 'state', 'zip', 'gender', 'user_pic')
  .where({FB_id: req.params.id})
  .first()
  .then(user => {
    if (!user) {
      knex('users')
      .returning('*')
      .insert({FB_id: req.body.id, first_name: req.body.firstName, last_name: req.body.lastName, user_pic: req.body.photoUrl})
      .then(user => {
        console.log("NEW FB USER")
        res.json(user)
      })
    } else {
      console.log("EXPRESS USER:", user);
      res.json(user)
    }
  })
})

router.post('/google/:id', (req, res, next) => {
  console.log("GOOGLE SIGN IN ROUTE");
  console.log("req.body:", req.body);
  knex('users')
  .select('id', 'username', 'first_name', 'last_name', 'street_address', 'city', 'state', 'zip', 'gender', 'user_pic')
  .where({google_id: req.params.id})
  .first()
  .then(user => {
    if (!user) {
      knex('users')
      .returning('*')
      .insert({google_id: req.body.id, first_name: req.body.firstName, last_name: req.body.lastName, user_pic: req.body.photoUrl})
      .then(user => {
        console.log("NEW GOOGLE USER")
        res.json(user)
      })
    } else {
      console.log("EXPRESS USER:", user);
      res.json(user)
    }
  })
})

module.exports = router;
