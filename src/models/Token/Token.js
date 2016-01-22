import {
  Schema,
  modelize,
} from 'core/mongoose';
import { generateToken } from './lib';

const defaultExpire = 60 * 24 * 60 * 60 * 1000; // 60 days

const tokenSchema = new Schema({
  user: {
    type: String,
    ref: 'User',
  },
  accessToken: {
    type: String,
    default: generateToken,
  },
  expireDate: {
    type: Date,
    default: () => Date.now() + defaultExpire,
  },
});

tokenSchema.methods = require('./methods');

const Token = modelize('Token', tokenSchema);

export default Token;
