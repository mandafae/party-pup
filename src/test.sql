SELECT
  sender_id, receiver_id, message, created_at, username, first_name, last_name, gender, user_pic
From
  messages
   inner join users on (
     users.id = messages.sender_id
   )
where
  messages.receiver_id = 4
  -- only return messages that are the most recent for the current sender/receiver combination
  AND messages.id = (
    SELECT
      sub_messages.id
    From
      messages as sub_messages
    where
      sub_messages.receiver_id = messages.receiver_id
      and sub_messages.sender_id = messages.sender_id
    order by
      sub_messages.created_at desc
    limit
      1
  );
