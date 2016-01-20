import {
  modelize,
  Schema,
  required,
} from 'core/mongoose';

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

const Passport = modelize('Passport', passportSchema);

export default Passport;
