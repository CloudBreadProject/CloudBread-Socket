import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { User, Token } from 'models';
import { EntityError } from 'core/error';

export const USER_NOT_FOUND = 'USER_NOT_FOUND';
export const USER_PASSWORD_INCORRECT = 'USER_PASSWORD_INCORRECT';
export const TOKEN_DOES_NOT_EXIST = 'TOKEN_DOES_NOT_EXIST';
export const TOKEN_INVALID = 'TOKEN_INVALID';
export const TOKEN_EXPIRED = 'TOKEN_EXPIRED';

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    return done(null, user.toObject());
  } catch (error) {
    return done(error);
  }
});

passport.use(new LocalStrategy(
  {
    usernameField: 'identifier',
    passwordField: 'password',
    session: false,
  },
  async (identifier, password, done) => {
    try {
      const user = await User.findOneByIdentifier(identifier);
      if (!user) {
        return done(null, false, USER_NOT_FOUND);
      }
      if (!(await user.verifyPassword(password))) {
        return done(null, false, USER_PASSWORD_INCORRECT);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.use(new BearerStrategy(
  async (accessToken, done) => {
    try {
      const token = await Token.findOne({ accessToken });
      if (!token) {
        return done(TOKEN_DOES_NOT_EXIST, false);
      }
      if (token.isExpired()) {
        return done(TOKEN_EXPIRED, false);
      }
      const user = await User.findById(token.user);
      if (!user) {
        return done(TOKEN_INVALID, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

export function localAuthenticate(req, res, next) {
  passport.authenticate('local', (error, user) => {
    if (error) {
      switch (error) {
        case USER_NOT_FOUND:
          return next(new EntityError('User Does Not Exist'));
        case USER_PASSWORD_INCORRECT:
          return next(new EntityError('Password Incorrect'));
        default:
          return error;
      }
    }

    if (!user) {
      return next(new EntityError('User Not Found'));
    }

    req.login(user, next);
  })(req, res, next);
}

export function bearerAuthenticate(req, res, next) {
  passport.authenticate('bearer', (error, user) => {
    if (error) {
      switch (error) {
        case TOKEN_DOES_NOT_EXIST:
          return next(new EntityError('Token does not exist'));
        case TOKEN_EXPIRED:
          return next(new EntityError('Token has expired'));
        case TOKEN_INVALID:
          return next(new EntityError('Token is invalid'));
        default:
          return next(error);
      }
    }

    if (!user) {
      return next(new EntityError());
    }

    req.login(user, next);
  })(req, res, next);
}

export default passport;
