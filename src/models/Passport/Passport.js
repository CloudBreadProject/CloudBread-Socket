import {
  modelize,
  Schema,
  required,
} from 'core/mongoose';
import { hash } from 'lib/bcrypt';

const passportSchema = new Schema({
  user: {
    type: String,
    ref: 'User',
  },
  password: {
    type: String,
    required,
  },
});

async function preSave(next) {
  this.password = await hash(this.password);
  next();
}

passportSchema.pre('save', preSave);

const Passport = modelize('Passport', passportSchema);

export default Passport;
