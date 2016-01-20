import mongoose from 'mongoose';
import { MONGO_DB_URL } from 'config/credentials';
import shortid from 'shortid';

export default mongoose;
export const Schema = mongoose.Schema;
export const Types = mongoose.Schema.Types;
export const required = true;
export const unique = true;

export function connectToMongoDB() {
  return new Promise((resolve, reject) => {
    mongoose.connect(MONGO_DB_URL);
    const db = mongoose.connection;
    db.once('error', error => reject(error));
    db.once('open', () => {
      if (__DEV__) {
        console.log('Mongoose connected'); // eslint-disable-line no-console
      }
      resolve();
    });
  });
}

export function modelize(modelName, schema) {
  schema.add({
    _id: {
      type: String,
      unique: true,
      default: shortid.generate,
    },
  });
  function setOption(option, value) {
    schema.set(option, schema.get(option) || value);
  }
  setOption('minimize', true);
  setOption('timestamps', true);
  return mongoose.model(modelName, schema);
}
