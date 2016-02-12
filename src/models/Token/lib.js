import { randomBytes } from 'crypto';

// @sync
export function generateToken() {
  return randomBytes(40).toString('hex');
}
