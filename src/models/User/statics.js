import { isEmail } from 'validator';

export function findOneByIdentifier(identifier) {
  const isEmailIdentifier = isEmail(identifier);
  const condition = isEmailIdentifier ? { email: identifier } : { username: identifier };
  return this.model('User').findOne(condition);
}
