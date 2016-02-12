import bcrypt from 'bcrypt';

export function hash(value) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        reject(error);
      }
      bcrypt.hash(value, salt, (error2, hashedValue) => {
        if (error2) {
          reject(error);
        }
        resolve(hashedValue);
      });
    });
  });
}

export function compare(value, hashedValue) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(value, hashedValue, (error, result) => error ? reject(error) : resolve(result));
  });
}
