// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      debug: true,
      database: 'partyPup_dev'
    }
  },

  test: {
    client: 'pg',
    connection: {
      debug: true,
      database: 'partyPup_test'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }


};
