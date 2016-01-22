import Passport from 'models/Passport';

export async function verifyPassword(password) {
  const user = this;
  const passport = await Passport.findOne({
    user: user.id,
  });
  if (!passport) {
    return false;
  }
  return await passport.verifyPassword(password);
}
