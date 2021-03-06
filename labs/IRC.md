# IRC Responder

## Overview

### Time

15 minutes

### Objectives

- How to use 3rd party modules.
- How to use the EventEmitter pattern.

## Lab

In this lab we will create an IRC bot that will respond to messages containing specific text in a room.

1. Create a new file named `index.js`.
2. In that directory, run `npm install irc` to install the [node-irc](https://github.com/martynsmith/node-irc) module.
3. In `index.js`, include the irc module.

  ```JavaScript
  var irc = require('irc');
  ```

3. To create an IRC bot, execute `new irc.Client()` ([api doc](https://node-irc.readthedocs.org/en/latest/API.html)) constructor with the desired configuration.

  *NOTE:* Be sure to use `floodProtection: true` for this lab, as we don't want to get banned from the IRC server.

  *NOTE:* Be sure to set the `username` variable to something that will be unique to your bot.

  ```JavaScript
  var irc = require('irc');

  var username = "";
  var channel = "#nodelabs-irclab";

  var client = new irc.Client("chat.freenode.net", username, {
     channels: [ channel ],
     floodProtection: true,
     debug: true
  });
  ```

4. The client will now join the room successfully. Run `node index.js` to see the client connect. If you enabled the `debug` option, your output should look something like this:

  ```
  27 Oct 11:23:36 - SEND: NICK :nodelabsbot_atd
  27 Oct 11:23:37 - SEND: USER nodebot 8 * :nodeJS IRC client
  27 Oct 11:23:41 - Unhandled message: { prefix: 'niven.freenode.net',
    server: 'niven.freenode.net',
    command: 'rpl_luserunknown',
    rawCommand: '253',
    commandType: 'reply',
    args: [ 'nodelabsbot_atd', '6', 'unknown connection(s)' ] }
  27 Oct 11:23:41 - MODE:nodelabsbot_atd sets mode: +i
  27 Oct 11:23:42 - SEND: JOIN :#nodelabs-irclab
  27 Oct 11:23:47 - MODE:#nodelabs-irclab sets mode: +ns
  27 Oct 11:23:47 - SEND: MODE :#nodelabs-irclab
  ```

5. If your server crashed on the last step, you'll already know that the "error" event is emitted when the client experiences a problem. To stop the application from crashing and see the error more cleanly, add an error handler.

  ```JavaScript
  var irc = require('irc');

  var username = "";
  var channel = "#nodelabs-irclab";

  var client = new irc.Client("chat.freenode.net", username, {
     channels: [ channel ],
     floodProtection: true,
     debug: true
  });

  client.on("error", console.error);
  ```

  This error handler will take any information passed to it and send it to STDERR. By subscribing to the `error` event, your application will no longer crash ([more info](http://nodejs.org/api/events.html#events_class_events_eventemitter)).

6. Now, to make it a little more interesting, we'll start listening and responding to messages in the chat room. For this lab, we'll use the following word list:

  ```Text
  node              aardvark
  bloody            smelly
  bump              test
  conversation      reticulating
  crazy             event
  ```

  Add an event listener for the `message` event, check for one of the words above, and, if present, respond with a sentence using a different one of the words above.

  ```JavaScript
  var irc = require('irc');

  var username = "";
  var channel = "#nodelabs-irclab";

  var client = new irc.Client("chat.freenode.net", username, {
     channels: [ channel ],
     floodProtection: true,
     debug: true
  });

  client.on("error", console.error);

  client.on("message", function (user, channel, message) {
     if (user !== username && message.toLowerCase().indexOf("test") >= 0) {
        client.say(channel, "Get your bloody test messages off my lawn!");
     }
  });
  ```

That's it! Fire up your bots and hop into the channel yourself to see the chatter!

## Looking for more?

Check out [HUBOT](http://hubot.github.com/), github's open-source chatbot running on Node.js written in [CoffeeScript](http://coffeescript.org/).

My personal favorite message responder: [pugme](https://github.com/github/hubot/blob/master/src/scripts/pugme.coffee).