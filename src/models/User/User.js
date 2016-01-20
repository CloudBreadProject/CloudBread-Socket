import {
  modelize,
  Schema,
  Types,
  unique,
  required,
  isEmail,
} from 'core/mongoose';

const userSchema = new Schema({
  email: {
    type: String,
    validate: [isEmail],
    unique,
    required,
  },
  name: {
    type: String,
    minlength: 4,
    maxlength: 20,
    required,
  },
  passports: [{
    type: Types.ObjectId,
    ref: 'Passport',
  }],
});

const User = modelize('User', userSchema);

export default User;
