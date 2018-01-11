const express = require('express');
const router = express.Router();
const knex = require('../db/knex');
const passport = require('passport')

// // GET users/:user_id
// // User profile
router.get('/:user_id', (req, res, next) => {
  knex('dogs')
  .returning('*')
  .where({owner_id: req.params.user_id})
  .then(dogs => {
    knex('users')
    .where({'users.id': req.params.user_id})
    .first()
    .then(user => {
      user.dogs = dogs;
      res.json(user);
    })
  })
})

// POST users
// Create new user
router.post('/', (req, res, next) => {
  knex('users')
  .returning('*')
  .insert(req.body)
  .then(user => res.json(user));
});

// PATCH users/:user_id
// Update user info
router.patch('/:user_id', (req, res, next) => {
  knex('users')
  .where({id: req.params.user_id})
  .first()
  .update(req.body)
  .returning('*')
  .then(user => res.json(user));
});

// DELETE users/:user_id
// Delete account
router.delete('/:user_id', (req, res, next) => {
  knex('users')
  .where({id: req.params.user_id})
  .first()
  .del()
  .then(() => res.send('User deleted'));
});

// GET users/:user_id/dogs
// All of a user's dogs
router.get('/:user_id/dogs', (req, res, next) => {
  knex('dogs')
  .join('users', {'users.id': 'dogs.owner_id'})
  .where({owner_id: req.params.user_id})
  .then(data => res.json(data));
});

// GET users/:user_id/dogs/:dog_id
// One of a user's dogs
router.get('/:user_id/dogs/:dog_id', (req, res, next) => {
  knex('dogs')
  .join('users', {'users.id': 'dogs.owner_id'})
  .where({owner_id: req.params.user_id})
  .andWhere({'dogs.id': req.params.dog_id})
  .then(data => res.json(data));
});

// GET users/:user_id/messages
// All of a user's messages
router.get('/:user_id/messages', (req, res, next) => {
  res.send('GET users/:user_id/messages')
});

module.exports = router;
