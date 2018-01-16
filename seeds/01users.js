
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'loveMyDog77',
                first_name: 'Jane',
                last_name: 'Smith',
                street_address: '119 Nueces St',
                city: 'Austin',
                state: 'TX',
                zip: '78701',
                gender: 'female',
                hash: '$2a$12$T0IqfaOKFP6jG7le24skOOxZBTJMopvzvwMr0Y3NbWQsdraQE8P1G'},
        {id: 2, username: 'Pookie4Ever',
                first_name: 'John',
                last_name: 'Johnson',
                street_address: '8820 Burnet Rd',
                city: 'Austin',
                state: 'TX',
                zip: '78757',
                gender: 'male',
                hash: '$2a$12$T0IqfaOKFP6jG7le24skOOxZBTJMopvzvwMr0Y3NbWQsdraQE8P1G'},
        {id: 3, username: 'dogzRuleCatzDrool',
                first_name: 'Tom',
                last_name: 'Jones',
                street_address: '2402 Guadalupe St',
                city: 'Austin',
                state: 'TX',
                zip: '78705',
                gender: 'male',
                hash: '$2a$12$T0IqfaOKFP6jG7le24skOOxZBTJMopvzvwMr0Y3NbWQsdraQE8P1G'},
        {id: 4, username: 'mandafae',
                first_name: 'Amanda',
                last_name: 'Freeman',
                street_address: '8820 Burnet Rd',
                city: 'Austin',
                state: 'TX',
                zip: '78757',
                gender: 'female',
                hash: '$2a$12$T0IqfaOKFP6jG7le24skOOxZBTJMopvzvwMr0Y3NbWQsdraQE8P1G',
                FB_id: '10156160062123413',
                google_id: '117063124051141470842'},
        {id: 5, username: 'puppyLove824',
                first_name: 'Lisa',
                last_name: 'Palmer',
                street_address: '119 Nueces St',
                city: 'Austin',
                state: 'TX',
                zip: '78701',
                gender: 'female',
                hash: '$2a$12$T0IqfaOKFP6jG7le24skOOxZBTJMopvzvwMr0Y3NbWQsdraQE8P1G'}
      ]);
    });
};
