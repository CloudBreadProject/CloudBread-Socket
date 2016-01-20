import mongoose from 'mongoose';
import { MONGO_DB_URL } from 'config/credentials';

export default mongoose;
export const Schema = mongoose.Schema;
export const Types = mongoose.Schema.Types;

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
  return mongoose.model(modelName, schema);
}
