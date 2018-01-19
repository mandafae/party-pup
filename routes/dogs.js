const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// GET dogs
// Get all the dogs
router.get('/', (req, res, next) => {
  knex('dogs')
  .returning('*')
  .then(dogs => res.json(dogs));
})

// POST dogs
// Add a new dog
router.post('/', (req, res, next) => {
  console.log("DOGS POST ROUTE");
  console.log("REQ.BODY:", req.body);
  knex('dogs')
  .returning('*')
  .insert(req.body)
  .then(dog => {
    console.log(dog)
    res.json(dog)
  });
});

// GET dogs/:dog_id
// One of a user's dogs
router.get('/:dog_id', (req, res, next) => {
  knex('users')
  .returning('*')
  .join('dogs', {'dogs.owner_id': 'users.id'})
  .where({'dogs.id': req.params.dog_id})
  .first()
  .then(dog => {
    console.log("DOG:", dog)
    res.json(dog)
  });
});

// PATCH dogs/:dog_id
// Update dog's info
router.patch('/:dog_id', (req, res, next) => {
  console.log("DOGS PATCH ROUTE!");
  console.log(req.body)
  knex('dogs')
  .where({id: req.params.dog_id})
  .first()
  .update(req.body)
  .returning('*')
  .then(dog => {
    console.log("UPDATED EXPRESS DOG:", dog);
    res.json(dog)
  })
});

// DELETE dogs/:dog_id
// Delete dog
router.delete('/:dog_id', (req, res, next) => {
  knex('dogs')
  .where({id: req.params.dog_id})
  .first()
  .del()
  .then(() => res.json('Dog deleted'));
});

module.exports = router;
