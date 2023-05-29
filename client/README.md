## Hello!

This is a project to display your test sensors.

To bring it to life, first start the server, and then go to the client and execute the following command:

```bash
npm install && npm run dev
```

Vite will indicate the port on which the dev server is running, so open it and take a look.

I didn't focus much on the interface - it's very basic and even primitive, but it fully adheres to the KISS principle.

I paid much more attention to the API implementation because, in my opinion, the API is the most interesting part here.

## What aspect of this exercise did you find most interesting?

It would be too easy and not quite right to redraw the data every time it is received from the socket. There can be many sensors, and they can change extremely quickly. That's why the API throttles the changes - it buffers the messages and delivers the received data no more frequently than the specified timeout.

Another interesting aspect is the control's reaction to sending a command to the sensor. Currently, when you click on the checkbox (connect/disconnect), the checkbox disappears (in a better world, you could show some kind of loader here) and only reappears after we receive a new message with the state for that sensor.

## What did you find most cumbersome to do?

The API, of course. Not that it was really difficult, but debugging the buffering was fun.

## How can we further improve the user experience?

There are a few important things that should be implemented but I didn't do. Most of them are related to the WS client. Ideally, the client should attempt to reconnect on its own, send pings, and indicate errors. This would allow, for example, reestablishing the connection when the server is turned on/off. And of course, it would be nice to make the interface less technical, add error handling, and other features.
