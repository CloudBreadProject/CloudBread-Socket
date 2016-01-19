import { resolve } from 'path';
import express from 'express';
import api from 'api';

const ROOT = resolve(__dirname, '.');
const app = express();
app.use(express.static(`${ROOT}/public`));

if (__DEV__) {
  app.use((req, res, next) => {
    console.log(req.url);
    return next();
  });
}

app.use('/api', api);

app.get('*', (req, res) => {
  res.status(200).send('Hello World');
});

const server = app.listen(process.env.PORT || __PORT__, () => {
  const { port } = server.address();
  console.log(`The server is listening at http://localhost:${port}`);
  if (__DEV__) {
    console.log('__DEV_START__');
  }
});

export default server;
