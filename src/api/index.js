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
  switch (error.name) {
    case 'GrantError':
    case 'EntityError':
      return res.status(error.status).send(error);
    default:
      return res.status(500).send(new ServerError());
  }
});

export default router;
