/* eslint no-console: 0 */
import express from 'express';
import cors from 'cors';

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

const io = require('socket.io')(server);
io.on('connection', socket => {
  const id = socket.client.id;

  socket.on('join channel', data => {
    const { channel, username } = data;
    socket.join(channel);
    socket.broadcast.to(channel).emit('user joined channel', {
      id,
      username,
    });
    console.log(socket.rooms);
  });

  socket.on('change userinfo', data => {
    const { channel, username } = data;
    socket.broadcast.to(channel).emit('user changed info', {
      id,
      username,
    });
  });

  socket.on('leave channel', data => {
    const { channel } = data;
    socket.broadcast.to(channel).emit('user left channel', {
      id,
    });
    socket.leave(channel);
  });

  socket.on('new message', data => {
    const { channel, message } = data;
    socket.broadcast.to(channel).emit('new message', {
      id,
      message,
    });
  });

  socket.on('start typing', data => {
    const { channel } = data;
    socket.broadcast.to(channel).emit('start typing', {
      id,
    });
  });

  socket.on('stop typing', data => {
    const { channel } = data;
    socket.broadcast.to(channel).emit('stop typing', {
      id,
    });
  });
});
