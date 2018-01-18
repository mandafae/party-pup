const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised');
const knex = require('../db/knex');

// // GET users/:user_id
// // User profile
router.get('/:user_id', (req, res, next) => {
  console.log("PROFILE ROUTE");
  knex('dogs')
  .select('*')
  .where({owner_id: req.params.user_id})
  .then(dogs => {
    knex('users')
    .select('id', 'username', 'first_name', 'last_name', 'street_address', 'city', 'state', 'zip', 'gender', 'user_pic')
    .where({'users.id': req.params.user_id})
    .first()
    .then(user => {
      user.dogs = dogs;
      console.log("EXPRESS USER:", user);
      res.json(user);
    })
  }).catch((err) => {
    next(err);
  })
})

// POST users
// Create new user
router.post('/', (req, res, next) => {
  console.log("REQ.BODY:", req.body);
  bcrypt.hash(req.body.password, 12)
  .then(hash => {
    console.log(req.body.username);
    console.log("HASH:", hash)
    knex('users')
    .returning('*')
    .insert({username: req.body.username, hash: hash})
    .then(user => {
      console.log(user[0]);
      res.json(user[0]);
    })
  });
});

// PATCH users/:user_id
// Update user info
router.patch('/:user_id', (req, res, next) => {
  console.log("IN PATCH ROUTE!!");
  console.log("req.body:", req.body);
  knex('users')
  .where({id: req.params.user_id})
  .first()
  .update(req.body)
  .returning('*')
  .then(user => {
    console.log("UPDATED EXPRESS USER:", user);
    res.json(user)
  })
});

// DELETE users/:user_id
// Delete account
router.delete('/:user_id', (req, res, next) => {
  console.log("DELETE ROUTE!!");
  knex('users')
  .where({id: req.params.user_id})
  .first()
  .del()
  .then(() => res.json('User deleted'));
});

// GET users/:user_id/dogs/:dog_id
// One of a user's dogs
router.get('/:user_id/dogs/:dog_id', (req, res, next) => {
  knex('users')
  .returning('*')
  .join('dogs', {'dogs.owner_id': 'users.id'})
  .where({'dogs.id': req.params.dog_id})
  .first()
  .then(data => {
    res.json(data)
  });
});

// GET users/:user_id/dogs
// All of a user's dogs
router.get('/:user_id/dogs', (req, res, next) => {
  knex('dogs')
  .join('users', {'users.id': 'dogs.owner_id'})
  .where({owner_id: req.params.user_id})
  .then(data => res.json(data));
});

// GET users/:user_id/messages
// All of a user's messages
router.get('/:user_id/messages', (req, res, next) => {
  res.send('GET users/:user_id/messages')
});

module.exports = router;
