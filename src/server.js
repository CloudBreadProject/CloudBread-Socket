import { resolve } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import api from 'api';
import { connectToMongoDB } from 'core/mongoose';
import { SECRET } from 'config/credentials';

const ROOT = resolve(__dirname, '.');
const app = express();
const server = app.listen(process.env.PORT || __PORT__, () => {
  const { port } = server.address();
  console.log(`The server is listening at http://localhost:${port}`);
  if (__DEV__) {
    console.log('__DEV_START__');
  }
});
export default server;

// before app has middlewares, you can pre-process
async function bootstrap() {
  await connectToMongoDB();
}

(async () => {
  try {
    await bootstrap();

    if (__DEV__) {
      app.use(morgan('dev'));
    } else {
      app.use(morgan('combined', {
        skip: (req, res) => res.statusCode < 400,
      }));
    }

    app.use(express.static(`${ROOT}/public`));
    app.use(bodyParser.json());
    app.use(bodyParser.raw());
    app.use(bodyParser.text());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(session({
      secret: SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: true,
      },
    }));

    app.use('/api', api);
    app.get('*', (req, res) => {
      res.status(200).send('Hello World');
    });
  } catch (error) {
    console.error(error);
  }
})();
