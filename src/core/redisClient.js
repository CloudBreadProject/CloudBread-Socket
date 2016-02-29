import { REDIS_HOST, REDIS_AUTH_KEY, REDIS_PORT } from 'config';
import { createClient as createRedisClient } from 'redis';

export const canRedis = REDIS_HOST;

export const pubClient = canRedis ? createRedisClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  auth_pass: REDIS_AUTH_KEY,
}) : null;

export const subClient = canRedis ? createRedisClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  auth_pass: REDIS_AUTH_KEY,
  return_buffers: true,
}) : null;

const redisClient = canRedis ? createRedisClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  auth_pass: REDIS_AUTH_KEY,
}) : null;

export function getRedisItem(id) {
  return new Promise((resolve, reject) => {
    redisClient.get(id, (error, res) => error ? reject(error) : resolve(res));
  });
}
