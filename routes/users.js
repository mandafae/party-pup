const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-as-promised');
const knex = require('../db/knex');

// // GET users/:user_id
// // User profile
router.get('/:user_id', (req, res, next) => {
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
      res.json(user);
    })
  }).catch((err) => {
    next(err);
  })
})

// POST users
// Create new user
router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, 12)
  .then(hash => {
    knex('users')
    .returning('*')
    .insert({username: req.body.username, hash: hash})
    .then(user => {
      res.json(user[0]);
    })
  });
});

// PATCH users/:user_id
// Update user info
router.patch('/:user_id', (req, res, next) => {
  knex('users')
  .where({id: req.params.user_id})
  .first()
  .update(req.body)
  .returning('*')
  .then(user => {
    res.json(user)
  })
});

// DELETE users/:user_id
// Delete account
router.delete('/:user_id', (req, res, next) => {
  knex('users')
  .where({id: req.params.user_id})
  .first()
  .del()
  .then(() => res.json('User deleted'));
});

// GET users/:user_id/dogs
// All of a user's dogs
router.get('/:user_id/dogs', (req, res, next) => {
  knex('dogs')
  .join('users', {'users.id': 'dogs.owner_id'})
  .where({owner_id: req.params.user_id})
  .then(dogs => res.json(dogs));
});

router.get('/:user_id/messages', (req, res, next) => {
  let query = `SELECT sender_id, receiver_id, message, created_at, username, first_name, last_name, gender, user_pic FROM messages INNER JOIN users on (users.id = messages.sender_id) WHERE messages.receiver_id = ${req.params.user_id} AND messages.id = (SELECT sub_messages.id FROM messages as sub_messages WHERE sub_messages.receiver_id = messages.receiver_id and sub_messages.sender_id = messages.sender_id ORDER BY sub_messages.created_at desc LIMIT 1)`
  knex.raw(query).then (messages => {
    res.json(messages.rows)
  })
});

// GET users/:receiver_id/messages/:sender_id
// A message thread
router.get('/:receiver_id/messages/:sender_id', (req, res, next) => {
  knex('messages')
  .fullOuterJoin('users', {'users.id': 'messages.sender_id'})
  .where({receiver_id: req.params.receiver_id})
  .andWhere({sender_id: req.params.sender_id})
  .orWhere({receiver_id: req.params.sender_id})
  .andWhere({sender_id: req.params.receiver_id})
  .orderBy('created_at', 'desc')
  .then(messages => {
    res.json(messages)
  });
});

router.post('/messages', (req, res, next) => {
  knex('messages')
  .insert(req.body)
  .returning('*')
  .then(message => {
    res.json(message)
  })
})

module.exports = router;
