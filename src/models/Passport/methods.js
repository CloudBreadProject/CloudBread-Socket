
import { compare } from 'lib/bcrypt';

// @async
export function verifyPassword(password) {
  return compare(password, this.password);
}
