import {
  modelize,
  Schema,
} from 'core/mongoose';

const userSchema = new Schema({
  name: String,
});

const User = modelize('User', userSchema);

export default User;
