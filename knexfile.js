// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      debug: true,
      database: 'partypup_dev'
    }
  },

  test: {
    client: 'pg',
    connection: {
      debug: true,
      database: 'partypup_test'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL
  }


};
