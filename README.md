# Real-time comments prototype

Simple demonstration of real-time commenting.

## Installation

After forking it, you need two environment variables in an `.env` file for it to run during development.

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

- On the first render of the clients, we need to return the initial data, which the clients would get by making GET requests to API endpoints like: **/comments**, **/reactions** etc. The APIs would read from the database using the ORM. 

- After the first render, the clients can listen for updates or write to the sockets (listen to events and emit events when writing).

- When events have been emitted from a client, the server responds to the sender and all the other related clients with the data, then the write to the database happens. The write to the database sort of happens in the _background_. This way it isn't blocking the clients from receiving the data.

### Data (User, Comment, Reaction)

### Tools (ORM and DB)

### Pagination when tons of comments

### Confidence
