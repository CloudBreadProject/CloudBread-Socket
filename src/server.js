/* eslint no-console: 0, no-throw-literal: 0 */
import express from 'express';
import cors from 'cors';
import redisAdapter from 'socket.io-redis';
import {
  subClient,
  pubClient,
  getRedisItem,
  canRedis,
} from 'core/redisClient';

const app = express();
const server = require('http').Server(app); // eslint-disable-line
server.listen(process.env.PORT || __PORT__, () => {
  const { port } = server.address();
  console.log(`The server is listening at http://localhost:${port}`);
  if (__DEV__) {
    console.log('__DEV_START__');
  }
});

app.use(cors());
app.get('*', (req, res) => {
  res.status(200).send('Hello World');
});

export default server;

// it can be replaced DB
const channels = {};
const users = {};

const io = require('socket.io')(server);

if (canRedis) {
  io.adapter(redisAdapter({
    pubClient,
    subClient,
  }));
}

io.on('connection', socket => {
  const id = socket.client.id;

  function use(route, callback) {
    socket.on(route, (...args) => {
      try {
        callback(...args);
      } catch (error) {
        if (typeof(error) === 'string') {
          socket.emit(`${route} error`, {
            type: route,
            message: error,
          });
        } else {
          console.log(error);
        }
      }
    });
  }

  // authorize user
  use('authenticate user', async ({ token, username }) => {
    if (canRedis) {
      const userInfo = await getRedisItem(token);
      if (!userInfo) throw 'Invalid token';
    }
    const user = users[id] = {
      id,
      username,
      channels: [],
    };
    socket.emit('authorized', {
      user,
    });
  });

  // join channel
  use('join channel', ({ link }) => {
    const user = users[id];
    if (!user) throw 'you should be authorized';
    if (user.channels.indexOf(link) !== -1) throw 'already connected';
    if (!channels[link]) {
      channels[link] = {
        link,
        allUsers: 0,
      };
    }
    const channel = channels[link];
    user.channels.push(link);
    channel.allUsers++;
    socket.join(link);
    socket.broadcast.to(link).emit('user joined', {
      channel,
      user,
    });
    socket.emit('channel connected', {
      channel,
    });
  });

  // leave channel
  use('leave channel', ({ link }) => {
    const user = users[id];
    if (!user) throw 'you should be authorized';
    if (user.channels.indexOf(link) === -1) throw 'not in connected';
    const channel = channels[link];
    if (!channel) throw 'the channel does not exist';
    user.channels.splice(user.channels.indexOf(link), 1);
    socket.emit('channel disconnected', { channel });
    socket.broadcast.to(link).emit('user left', { channel, user });
    socket.leave(link);
    channel.allUsers -= 1;
    if (!channel.allUsers) {
      delete channels[link];
    }
  });

  // send new message to users in the channel
  use('new message', ({ link, content }) => {
    const user = users[id];
    if (!user) throw 'you should be authorized';
    const channel = channels[link];
    if (!channel) throw 'the channel does not exist';
    if (user.channels.indexOf(link) === 0) throw 'you did not join the channel';
    const message = {
      author: id,
      username: user.username,
      content,
    };
    io.sockets.to(link).emit('new message', {
      message,
      channel,
    });
  });

  // disconnected
  socket.on('disconnect', () => {
    const user = users[id];
    if (!user) {
      return;
    }
    user.channels.forEach(link => {
      const channel = channels[link];
      socket.broadcast.to(link).emit('user left', { channel, user });
      channel.allUsers -= 1;
      if (!channel.allUsers) {
        delete channels[link];
      }
    });
  });
});
