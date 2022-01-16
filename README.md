# Real-time comments prototype

Simple demonstration of real-time commenting.

## Installation

After forking it, run `npm install`, then you need two environment variables in an `.env` file for it to run during development.

`PORT`: **3000**

`CONNECTION_URL`: **http://localhost:3000**

## Development

You'll need to run two terminals (or bring in a process manager like concurrently/pm2-dev if you like):

Start the Remix development asset server

```sh
npm run dev
```

In a new tab start your express app:

```sh
npm run start:dev
```

This starts your app in development mode, which will purge the server require cache when Remix rebuilds assets so you don't need a process manager restarting the express server.

## How would we scale and make this production-ready?

My initial diagram of how the design may be.

![real-time-comments-prototype-scale](https://user-images.githubusercontent.com/49603590/149663865-a7e10187-0309-45f3-b465-d95cc2f09b2d.png)

- On the first render of the clients, we need to return the initial data, which the clients would get by making GET requests to API endpoints like: **/comments**, **/reactions/{commentId}** etc. The APIs would read from the database using the ORM. 

- After the first render, the clients can listen for updates or write to the sockets (listen to events and emit events when writing).

- When events have been emitted from a client, the server responds to the sender and all the other related clients with the data, then the write to the database happens. The write to the database sort of happens in the _background_. This way it isn't blocking the clients from receiving the data.

### Data (User, Comment, Reaction)

Since our data is quite relational & structured, and considering today's ways of scaling SQL databases (i.e. Vitess), a SQL database fits our scenario.

Data modelling in an image:

This is surely not complete, please check open questions section below.

![reactions-drawing](https://user-images.githubusercontent.com/49603590/149671539-e70a1466-aff9-4f0b-8db0-b169ffdab15c.png)

### Tools (ORM and DB)

**Prisma as ORM:**

- Amazing DX, type-safety is super awesome, works well with SQL databases.

- Build fast and make fewer errors.

**Planetscale as DB:**

- A SQL database.

- Based on Vitess. Performant, highly available, can scale horizontally and more.

- From their website: "...With horizontal sharding and unlimited connections, you can harness the power of Vitess without hiring a team of engineers."

- Amazing Git-like work flow to be productive.

- Works great with prisma.

### Pagination when tons of comments

Three options come to mind when handling pagination for comments, i.e. in a Slack Thread.

- **Infinite Paging:** User scrolls down to the bottom and clicks on a button to load the next 10 comments.

- **Infinite Loading:** User scrolls down to the bottom and the next 10 comments gets loaded. We can detect that via intersection oberserver.

- **List virtualization:** Only render comments that is within the user's window (what the user sees), and dynamically render them as the user scrolls.

The option with the best UX for i.e. a Slack Thread, to me would be **List virtualization**. This way we keep it performant and don't load all the comments, but at the same time from the user's perspective, it feels nice, since they don't have to consistently wait for another bunch of comments to be loaded.

### Confidence

In order to achieve confidence our app is working as it should, we of course need testing.

It is important that we write the right tests, and really focus on resembling the user, otherwise at least focus on the behavior, and not test implementation details.

For the tests since we will likely need to spin up multiple tabs or browsers, in order to test the real-time behavior and how it works for multiple users, Playwright fits into this.

Cypress is amazing, but for our situation it is limited, and we won't achieve full confidence by testing with a single browser.

## Open Questions/Thoughts

- **Reaction Model:**

Right now I'm not 100% sure if the data modelling would work as in the diagram. 

Where do we get our labels? 

The encoding of the emojis, from researching it seems like they are typically encoded as the type **utf8mb4**?

- **Count of Reactions:**

If we switch to NoSQL, we could dynamically add a count column to each **comment** to keep track of the amount of a specific reaction, by composing it with its label. An example: "smiley" + "Count", would turn into **smileyCount** property, which would exist as long as it is equal to or greater than one, if less, it gets removed.

Otherwise we may have to add a count column for each type of reaction via its label. Can likely be done by writing a script, but how efficient that is, is a different question.
