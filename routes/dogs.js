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
  knex('dogs')
  .returning('*')
  .insert(req.body)
  .then(dog => res.json(dog));
});

// PATCH dogs/:dog_id
// Update dog's info
router.patch('/:dog_id', (req, res, next) => {
  knex('dogs')
  .where({id: req.params.dog_id})
  .first()
  .update(req.body)
  .returning('*')
  .then(user => res.json(user));
});

// DELETE dogs/:dog_id
// Delete dog
router.delete('/:dog_id', (req, res, next) => {
  knex('dogs')
  .where({id: req.params.dog_id})
  .first()
  .del()
  .then(() => res.send('Dog deleted'));
});

module.exports = router;
