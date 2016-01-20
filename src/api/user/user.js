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
  })
  .post(async (req, res, next) => {
    let user;
    try {
      const { email, name } = req.body;
      user = new User({
        email,
        name,
      });
      user = await user.save();
      return res.send(user);
    } catch (error) {
      if (user) {
        user.remove();
      }
      return next(error);
    }
  });

router
  .route('/users/:userId');

export default router;
