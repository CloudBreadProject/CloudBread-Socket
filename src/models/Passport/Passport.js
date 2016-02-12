import {
  modelize,
  Schema,
} from 'core/mongoose';
import { hash } from 'lib/bcrypt';

const passportSchema = new Schema({
  user: {
    type: String,
    ref: 'User',
  },
  password: {
    type: String,
  },
  accessToken: {
    type: String,
  },
});

passportSchema.methods = require('./methods');
passportSchema.statics = require('./statics');

async function preSave(next) {
  if (this.isModified('password')) {
    if (!this.password) {
      // TODO: when provider is local, password should be came
    }

    if (this.password < 10 || this.password > 30) {
      // TODO: validate password length
    }

    // TODO: validate password combinations with alpha, number, !@#$

    // hash password
    this.password = await hash(this.password);
  }
  return next();
}

passportSchema.pre('save', preSave);

const Passport = modelize('Passport', passportSchema);

export default Passport;
