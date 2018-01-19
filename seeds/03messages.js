
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
          created_at: 1516313710000
        },
        {
          sender_id: 2,
          receiver_id: 1,
          message: "That sounds great! When are you free?",
          created_at: 1516314430000
        },
        {
          sender_id: 1,
          receiver_id: 2,
          message: "How about Friday at 6pm?",
          created_at: 1516315510000
        },
        {
          sender_id: 2,
          receiver_id: 1,
          message: "That's perfect! See you then!",
          created_at: 1516315930000
        },
        {
          sender_id: 3,
          receiver_id: 4,
          message: "Lola would love to meet Taco. Are you guys free Saturday afternoon?",
          created_at: 1516313710000
        },
        {
          sender_id: 4,
          receiver_id: 3,
          message: "Yes! Want to meet at Starbucks in the Domain and find a grassy field for the pups to play in?",
          created_at: 1516314430000
        },
        {
          sender_id: 3,
          receiver_id: 4,
          message: "Great! How about 1pm?",
          created_at: 1516315510000
        },
        {
          sender_id: 4,
          receiver_id: 3,
          message: "Perfect!",
          created_at: 1516315930000
        },
        {
          sender_id: 4,
          receiver_id: 5,
          message: "Our dogs should hang out!",
          created_at: 1516313710000
        },
        {
          sender_id: 5,
          receiver_id: 4,
          message: "That sounds great! When are you free?",
          created_at: 1516314430000
        },
        {
          sender_id: 4,
          receiver_id: 5,
          message: "How about Friday at 6pm?",
          created_at: 1516315510000
        },
        {
          sender_id: 5,
          receiver_id: 4,
          message: "That's perfect! See you then!",
          created_at: 1516315930000
        }
      ]);
    });
};
