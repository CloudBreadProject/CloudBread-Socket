import { Router } from 'express';
import { localAuthenticate, bearerAuthenticate } from 'core/passport';
import Token from 'models/Token';

const router = Router();

router
  .route('/auth')
  .post(localAuthenticate, async (req, res, next) => {
    try {
      const { user } = req;
      // TODO: token scope for the future
      const token = await Token.create({
        user: user.id,
      });
      return res.send(token);
    } catch (error) { // eslint-disable-line no-shadow
      return next(error);
    }
  });

router
  .route('/auth/token')
  .get(bearerAuthenticate, (req, res) => {
    res.send('Authorized!');
  });

export default router;
