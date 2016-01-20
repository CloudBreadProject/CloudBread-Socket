import {
  modelize,
  Schema,
  Types,
  unique,
  required,
} from 'core/mongoose';

const userSchema = new Schema({
  email: { type: String, unique, required },
  name: String,
  passports: [{ type: Types.ObjectId, ref: 'Passport' }],
});

const User = modelize('User', userSchema);

export default User;
