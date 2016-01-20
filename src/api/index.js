import { Router } from 'express';
import * as routes from './routes';

const router = Router();

for (const key in routes) {
  if (routes[key]) {
    router.use(routes[key]);
  }
}

export default router;
