# Web Socket Reference

## Error Handling
when troubles come, you can handle it like this

```js
socket.on('error', ({
  type,    // error constant such as `authenticate user`, `join channel`, etc...
  message, // error message
}) => {
  // ...
});
```

## Authentication
users should be authorized to chat

```js
// try to authenticate user
socket.emit('authenticate user', {
  username: 'username',
  token: 'token',
});

// succeed to authorize user
socket.on('authorized', ({ user }) => {
  const {
    id,       // unique client ID
    username, // username
    channels, // channels connected
  } = user;
});
```

## Join Channel
```js
socket.emit('join channel', {
  link: 'channel short ID',
});

// succeed to join channel
socket.on('channel connected', ({ channel }) => {
  const {
    link,     // channel short ID
    allUsers, // number of users joined
  } = channel;
});

// new user joined (to old connecters)
socket.on('user joined', ({ user, channel }) => {
  // ...
});
```

## Leave Channel
```js
socket.emit('leave channel', {
  link: 'channel short ID',
});

// succeed to leave channel
socket.on('channel disconnected', { channel } => { ... });

// a user dropped out channel
socket.on('user left', { channel, user } => { ... });
```

## New Message
send messages to others in the channel and receive messages from them
```js
socket.emit('new message', {
  link: 'channel short ID',
  content: 'message',
});

socket.on('new message', ({ channel, message }) => {
  const {
    author,   // unique client id
    username, // username
    content,  // message content
  } = message;
});
```
