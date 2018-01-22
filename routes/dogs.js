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
  .then(dog => {
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
    res.json(dog)
  });
});

// PATCH dogs/:dog_id
// Update dog's info
router.patch('/:dog_id', (req, res, next) => {
  knex('dogs')
  .where({id: req.params.dog_id})
  .first()
  .update(req.body)
  .returning('*')
  .then(dog => {
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

// POST dogs/search
// Build search query
router.post('/search', (req, res, next) => {
  let query = knex('dogs')
  query.join('users', 'dogs.owner_id', '=', 'users.id').select('dogs.id', 'dogs.dog_name', 'dogs.sex', 'dogs.fixed', 'dogs.weight', 'dogs.breed', 'dogs.age_number', 'dogs.age_unit', 'dogs.play_style', 'dogs.play_notes', 'dogs.fence_required', 'dogs.health_issues', 'dogs.health_notes', 'dogs.bio', 'dogs.dog_pic', 'dogs.owner_id', 'users.first_name', 'users.last_name', 'users.gender')
  if (req.body.play_style.cushy) {
    query.whereRaw("play_style @> '{\"cushy\": true}'")
  }
  if (req.body.play_style.explorer) {
    query.whereRaw("play_style @> '{\"explorer\": true}'")
  }
  if (req.body.play_style.shy) {
    query.whereRaw("play_style @> '{\"shy\": true}'")
  }
  if (req.body.play_style.cheerleader) {
    query.whereRaw("play_style @> '{\"cheerleader\": true}'")
  }
  if (req.body.play_style.speed) {
    query.whereRaw("play_style @> '{\"speed\": true}'")
  }
  if (req.body.play_style.tag) {
    query.whereRaw("play_style @> '{\"tag\": true}'")
  }
  if (req.body.play_style.wrestler) {
    query.whereRaw("play_style @> '{\"wrestler\": true}'")
  }
  if (req.body.play_style.boxer) {
    query.whereRaw("play_style @> '{\"boxer\": true}'")
  }
  if (req.body.play_style.body_slammer) {
    query.whereRaw("play_style @> '{\"body_slammer\": true}'")
  }
  if (req.body.small) {
    query.whereBetween('weight', [1, 20])
  }
  if (req.body.medium) {
    query.whereBetween('weight', [21, 40])
  }
  if (req.body.large) {
    query.whereBetween('weight', [41, 70])
  }
  if (req.body.giant) {
    query.where('weight', '>', 70)
  }
  if (req.body.puppy) {
    query.where('age_number', '<', 12)
         .andWhere('age_unit', '=', 'months')
  }
  if (req.body.adult) {
    query.whereBetween('age_number', [1, 7])
         .andWhere('age_unit', '=', 'years')
  }
  if (req.body.senior) {
    query.where('age_number', '>', 7)
         .andWhere('age_unit', '=', 'years')
  }
  if (req.body.sex.male) {
    query.where({sex: 'male'})
  }
  if (req.body.sex.female) {
    query.where({sex: 'female'})
  }
  if (req.body.fixed) {
    query.where({fixed: true})
  }
  if (req.body.gender === 'male') {
    query.where({gender: 'male'})
  }
  if (req.body.gender === 'female') {
    query.where({gender: 'female'})
  }
  if (req.body.gender === 'no_pref') {
    query.where({gender: 'male'}).orWhere({gender: 'female'})
  }
  query.then(dogs => {
    res.json(dogs)
  })
})

module.exports = router;
