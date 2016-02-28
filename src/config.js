const env = {
  REDIS_PORT: 6379,
  REDIS_HOST: 'localhost',
  ...process.env,
};

export const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_AUTH_KEY,
} = env;
