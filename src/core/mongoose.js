/* eslint no-shadow: 0 */
import mongoose from 'mongoose';
import { MONGO_DB_URL } from 'config/credentials';
import shortid from 'shortid';
import validator from 'validator';

export default mongoose;
export const Schema = mongoose.Schema;
export const Types = mongoose.Schema.Types;
export const required = true;
export const unique = true;
export const createdAt = true;
export const updatedAt = true;

export const isEmail = {
  validator: validator.isEmail,
  message: '{VALUE} is invalid email address',
};
export const isAlphanumeric = {
  validator: validator.isAlphanumeric,
  message: '{VALUE} is not alpha, number.',
};

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

function preUpdate(next) {
  this.updatedAt = Date.now();
  next();
}

export function modelize(modelName, schema, {
  createdAt = true,
  updatedAt = false,
} = {}) {
  schema.add({
    _id: {
      type: String,
      unique: true,
      default: shortid.generate,
    },
  });
  if (createdAt) {
    schema.add({
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });
  }
  if (updatedAt) {
    schema.add({
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    });
    schema.pre('update', preUpdate);
    schema.pre('save', preUpdate);
    schema.pre('findOneAndUpdate', preUpdate);
  }
  function setOption(option, value) {
    schema.set(option, schema.get(option) || value);
  }
  setOption('minimize', true);
  return mongoose.model(modelName, schema);
}
