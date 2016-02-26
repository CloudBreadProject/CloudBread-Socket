import { Router } from 'express';
import * as routes from './routes';
import { ServerError } from 'core/error';

const router = Router();

for (const key in routes) {
  if (routes[key]) {
    router.use(routes[key]);
  }
}

router.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(error); // eslint-disable-line no-console
  let status = 400;
  switch (error.name) {
    case 'GrantError':
    case 'EntityError':
      return res.status(error.status).send(error);
    case 'ValidationError':
      // mongoose validator error
      status = 400;
      return res.status(status).send({
        status,
        ...error,
      });
    case 'MongoError':
    default:
      return res.status(500).send(new ServerError());
  }
});

export default router;
