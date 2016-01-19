import mongoose from 'mongoose';
import { MONGO_DB_URL } from 'config/credentials';

export function connectToMongoDB() {
  return new Promise((resolve, reject) => {
    mongoose.connect(MONGO_DB_URL);
    const db = mongoose.connection;
    db.once('error', error => reject(error));
    db.once('open', () => {
      if (__DEV__) {
        console.log('Mongoose connected');
      }
      resolve();
    });
  });
}

export function modelize(modelName, schema) {
  return mongoose.model(modelName, schema);
}
