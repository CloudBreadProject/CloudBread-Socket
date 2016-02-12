/* eslint no-console: 0 */
import { resolve } from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'core/passport';
import { SECRET } from 'config/credentials';
import api from 'api';
import bootstrap from './bootstrap';

const ROOT = resolve(__dirname, '.');
const app = express();
const server = app.listen(process.env.PORT || __PORT__, () => {
  const { port } = server.address();
  console.log(`The server is listening at http://localhost:${port}`);
  if (__DEV__) {
    console.log('__DEV_START__');
  }
});

(async () => {
  try {
    await bootstrap();
    if (__DEV__) {
      app.use(morgan('dev'));
    } else {
      app.use(morgan('combined', {
        skip: (req, res) => res.statusCode < 400,
      }));
      // redirect HTTP to HTTPS in production
      app.use((req, res, next) => {
        if (!req.secure) {
          return res.redirect(`https://${req.headers.host}${req.url}`);
        }
        return next();
      });
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
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/api', api);
  } catch (error) {
    console.error(error);
  }
})();

app.get('*', (req, res) => {
  res.status(200).send('Hello World');
});

export default server;
