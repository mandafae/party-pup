# Party Pup
**Party Pup is a full-stack web app that helps dog owners arrange puppy playdates. It was built it two weeks.**

My goal was to simplify the process of finding friends for man's (or woman's) best friend. Being a pet owner all my life, and having worked with dogs for years, I noticed that dogs play in many different ways, and, often, those ways don't work well together. Party Pup allows users to quickly and easily find dogs who have similar play styles to their own pup, and then set up meetings with those dogs' owners so that their dogs can play together.

**Technologies:**
- Node.js
- Express
- PostgreSQL
- Knex.js
- Angular 5
- Bcrypt
- Materialize CSS
- Heroku (for deployment)
- AWS (for image hosting)
---
## Challenges:

- Learning the ins and outs of Angular 5. I've worked with AngularJS and React before, but **this was my first app built in Angular 5**. I learned a lot about Angular forms and working with Observables.

- Building complex SQL queries using Knex. Many of **my views required getting very specific information** and performing joins that I did not have experience with. I utilized raw SQL queries, as Knex didn't have some of the methods I required built-in.

- Some of my data is in JSONB format. While I had worked with JSONB on another project, **I hadn't needed to access and utilize the data in the same way that I needed** for this project. Again, using raw SQL queries was very helpful for this, as Knex's built-in methods fell a little short.

- I originally intended to use PassportJS for social sign-in. However, I eventually realized this wasn't the best option for my project (it is too robust and also requires a full redirect, which isn't in line with a single page app) and **had to switch gears and find a different solution**. I found a library that is specifically meant to be used with Angular and decided this was a better option.
---
## Walkthrough:
### 1. Sign In
![Sign In](readme/signin.png)
Users can either create an account with Party Pup or choose social sign-in with Facebook or Google.

### 2. Browse Dogs
![Dashboard](readme/dashboard.png)
Users are brought to a dashboard displaying dogs and some of their basic information. From here, they can click on a dog for more information or navigate to any of the other parts of the app using the navigation at the top.

### 3. View A Dog
![Detail](readme/detail.png)
Users can view a dog's details and message the pet parent to set up a playdate from here.

### 4. Search For Dogs
![Search](readme/search.png)
Alternatively, users can search for dogs based on various criteria. After searching, they are brought to a page similar to the dashboard, enabling them to view more details and message pet parents.

### 5. Message Inbox
![Inbox](readme/inbox.png)
Here, users can view all of the messages they've received. The sender and date of most recent message are displayed, along with the beginning of the message.

### 6. View Message Thread
![Message Thread](readme/message-thread.png)
Users can view a message thread with a user and send more messages. When a message is sent, it displays in the thread in real time.

### 7. Profile
![Profile](readme/profile.png)
This is the user profile. Users can view their details, as well as all details about their dog(s). From this page, they can edit all of this information, add a new dog, and delete dogs or their account entirely.

**Now it's time for a puppy party!**
