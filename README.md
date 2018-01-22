# Party Pup
**Party Pup is a full-stack web app that helps dog owners arrange puppy playdates. It was built it two weeks.**

My goal was to simplify the process of finding friends for man's (or woman's) best friend. Being a pet owner all my life, and having worked with dogs for years, I noticed that dogs play in many different ways, and, often, those ways don't work well together. Party Pup allows users to quickly and easily find dogs who have similar play styles to their own pup, and then set up meetings with those dogs' owners.

Technologies:
- Node.js
- Express
- PostgreSQL
- Knex.js
- Angular 5
- Materialize CSS
- Heroku (for deployment)
- AWS (for image hosting)
---
## Challenges:
- Learning the ins and outs of Angular 5. I've worked with AngularJS and React before, but **this was my first app built in Angular 5**. I learned a lot about Angular forms and working with Observables.
- Building complex SQL queries using Knex. Many of **my views required getting very specific information** and performing joins that I did not have experience with. I utilized raw SQL queries, as Knex didn't have some of the methods I required built-in.
- I originally intended to use PassportJS for social sign-in. However, I eventually realized this wasn't the best option for my project (it is too robust and also requires a full redirect, which isn't in-line with a single page app) and had to switch gears and find a different solution. I settled on a library that is specifically meant to be used with Angular.
