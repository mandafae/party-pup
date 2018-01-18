
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {
          sender_id: 1,
          receiver_id: 2,
          message: "Our dogs should hang out!",
          created_at: 'Thu Jan 18 2018 16:15:10 GMT-0600 (CST)'
        },
        {
          sender_id: 2,
          receiver_id: 1,
          message: "That sounds great! When are you free?",
          created_at: 'Thu Jan 18 2018 16:27:10 GMT-0600 (CST)'
        },
        {
          sender_id: 1,
          receiver_id: 2,
          message: "How about Friday at 6pm?",
          created_at: 'Thu Jan 18 2018 16:45:10 GMT-0600 (CST)'
        },
        {
          sender_id: 2,
          receiver_id: 1,
          message: "That's perfect! See you then!",
          created_at: 'Thu Jan 18 2018 16:52:10 GMT-0600 (CST)'
        },
      ]);
    });
};
