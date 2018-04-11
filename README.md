## Vinny's calculator

So, the ask was to make a 4-function calculator using React and Apollo. The use of Apollo suggested to me the concept of data persistence

As a proof of concept, I could have stood up a graphql layer that persists data in memory. For whatever reason, I decided to create an actual database layer using [Prisma](https://www.prisma.io/). This definitely added extra complexity to my task.

## BE repo
There's a lot of stuff in the graphql layer I stood up!

https://github.com/vdefranc/vinny-four-function-calculator-server

## the functionality

When you start the application, it checks localStorage for a calculator id. If one does not exist, it will persist a new calculator session.
You can execute standard operations using the calculator. When you do, the operation will be persisted to the database.

When you come back to the page, you will see your previous operations.

## what I think you should take away from this

I was able to stand up a graphql layer and a prisma database layer within 48 hours (working in my spare time between my job and the class I teach). I think that's pretty good. Oh, and I got it deployed as well.


## regrets

I was frustrated that it took me some time to figure out how to work with Prisma. I think that it would have been much more efficient to create this proof-of-concept by persisting data in memory.

I wish it was responsive. I wish I had some time to make the operation history look a lot nicer.

I wish I had time to polish the calculator's functionality a bit more.

I wish I had time to implement a graphql subscription for the operations sidebar.

_Alright, I need to be getting back to work :) Thanks for reading._
