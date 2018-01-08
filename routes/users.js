const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// GET users/:user_id
// User profile
router.get('/:user_id', (req, res, next) => {
  res.send('GET users/:user_id')
});

// POST users/:user_id
// Create new user
router.post('/', (req, res, next) => {
  res.send('POST users/:user_id')
});

// PATCH users/:user_id
// Update user info
router.patch('/:user_id', (req, res, next) => {
  res.send('PATCH users/:user_id')
});

// DELETE users/:user_id
// Delete account
router.delete('/:user_id', (req, res, next) => {
  res.send('DELETE users/:user_id')
});

// GET users/:user_id/dogs
// All of a user's dogs
router.get('/:user_id/dogs', (req, res, next) => {
  res.send('GET users/:user_id/dogs')
});

// GET users/:user_id/dogs/:dog_id
// One of a user's dogs
router.get('/:user_id/dogs/:dog_id', (req, res, next) => {
  res.send('GET users/:user_id/dogs/:dog_id')
});

// POST users/:user_id/dogs/:dog_id
// Add a new dog
router.post('/:user_id/dogs', (req, res, next) => {
  res.send('POST users/:user_id/dogs')
});

// PATCH users/:user_id/dogs/:dog_id
// Update dog's info
router.patch('/:user_id/dogs/:dog_id', (req, res, next) => {
  res.send('PATCH users/:user_id/dogs/:dog_id')
});

// DELETE users/:user_id/dogs/:dog_id
// Delete dog
router.delete('/:user_id/dogs/:dog_id', (req, res, next) => {
  res.send('DELETE users/:user_id/dogs/:dog_id')
});

// GET users/:user_id/messages
// All of a user's messages
router.get('/:user_id/messages', (req, res, next) => {
  res.send('GET users/:user_id/messages')
});

module.exports = router;
