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

// POST dogs/search
// Build search query
router.post('/search', (req, res, next) => {
  console.log(req.body)
  let query = knex('dogs')
  let subquery = knex('dogs').column('play_style')
  knex.column('play_style').select().from('dogs')
  // if (req.body.play_style.cushy) {
  //   query.where({'play_style[cushy]': true})
  // }
  // if (req.body.play_style.explorer) {
  //   query.where({'play_style[explorer]': true})
  // }
  // if (req.body.play_style.shy) {
  //   query.where({'play_style[shy]': true})
  // }
  // if (req.body.play_style.cheerleader) {
  //   query.where({'play_style[cheerleader]': true})
  // }
  // if (req.body.play_style.speed) {
  //   query.where({'play_style[speed]': true})
  // }
  // if (req.body.play_style.tag) {
  //   query.where({'play_style[tag]': true})
  // }
  // if (req.body.play_style.wrestler) {
  //   query.where({'play_style[wrestler]': true})
  // }
  // if (req.body.play_style.boxer) {
  //   query.where({'play_style[boxer]': true})
  // }
  // if (req.body.play_style.body_slammer) {
  //   query.where({'play_style[body_slammer]': true})
  // }
  // if (req.body.small) {
  //   query.whereBetween('weight', [1, 20])
  // }
  // if (req.body.medium) {
  //   query.whereBetween('weight', [21, 40])
  // }
  // if (req.body.large) {
  //   query.whereBetween('weight', [41, 70])
  // }
  // if (req.body.giant) {
  //   query.where('weight', '>', 70)
  // }
  // if (req.body.puppy) {
  //   query.where('age_number', '<', 12)
  //        .andWhere('age_unit', '=', 'months')
  // }
  // if (req.body.adult) {
  //   query.whereBetween('age_number', [1, 7])
  //        .andWhere('age_unit', '=', 'years')
  // }
  // if (req.body.senior) {
  //   query.where('age_number', '>', 7)
  //        .andWhere('age_unit', '=', 'years')
  // }
  // if (req.body.sex.male) {
  //   query.where({sex: 'male'})
  // }
  // if (req.body.sex.female) {
  //   query.where({sex: 'female'})
  // }
  // if (req.body.fixed) {
  //   query.where({fixed: true})
  // }
  // if (req.body.gender === 'male') {
  //   query.where({gender: 'male'})
  // }
  // if (req.body.gender === 'female') {
  //   query.where({gender: 'female'})
  // }
  // query.where({'play_style.cushy': true})
  .then(dogs => {
    console.log(dogs)
    res.json(dogs)
  })
})

module.exports = router;
