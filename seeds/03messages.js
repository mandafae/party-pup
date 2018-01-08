
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {id: 1, sender_id: 1,
                receiver_id: 2,
                message: "Our dogs should hang out!",
                created_at: Date.now(),
                updated_at: Date.now()}
      ]);
    });
};
