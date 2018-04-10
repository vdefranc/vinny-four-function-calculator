## Vinny's calculator

So, the ask was to make a 4-function calculator using React and Apollo. The use of Apollo suggested to me the concept of data persistence

As a proof of concept, I could have stood up a graphql layer that persists data in memory. For whatever reason, I decided to create an actual database layer using [Prisma](https://www.prisma.io/). This definitely added extra complexity to my task.

## the functionality

When you start the application, it checks localStorage for a calculator id. If one does not exist, it will persist a new calculator session.
You can execute standard operations using the calculator. When you do, the operation will be persisted to the database.

When you come back to the page, you will see your previous operations.

## regrets

I was frustrated that it took me some time to figure out how to work with Prisma. I think that it would have been much more efficient to create this proof-of-concept by persisting data in memory.

I wish it was responsive. I wish I had some time to make the operation history look a lot nicer.

Also, I really hate and am terrified that the apollo client is hitting 'localhost' when deployed to heroku.

Alright, I need to be getting back to work :) Thanks for reading.
