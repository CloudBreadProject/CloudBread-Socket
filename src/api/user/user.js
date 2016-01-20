import { Router } from 'express';
import User from 'models/User';

const router = Router();

router
  .route('/users')
  .get(async (req, res, next) => {
    try {
      const users = await User.find();
      return res.send(users);
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/users/:id');

export default router;
