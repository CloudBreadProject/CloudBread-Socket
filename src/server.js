/* eslint no-console: 0 */
import express from 'express';

const app = express();
const server = app.listen(process.env.PORT || __PORT__, () => {
  const { port } = server.address();
  console.log(`The server is listening at http://localhost:${port}`);
  if (__DEV__) {
    console.log('__DEV_START__');
  }
});

app.get('*', (req, res) => {
  res.status(200).send('Hello World');
});

export default server;
