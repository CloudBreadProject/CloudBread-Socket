import {
  modelize,
  Schema,
  Types,
  required,
} from 'core/mongoose';

const passportSchema = new Schema({
  user: { type: Types.ObjectId, ref: 'User' },
  password: { type: String, required },
});

const Passport = modelize('Passport', passportSchema);

export default Passport;
