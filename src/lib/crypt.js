import crypto from 'crypto';

export function decryptAES256(encodedData, key, iv) {
  const data = new Buffer(encodedData, 'base64').toString('Binary');
  const decipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  return decipher.update(data) + decipher.final();
}
