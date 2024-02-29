export const ACCESS_TOKEN_EXPIRATION_TIME_IN_SECONDS = 900;

export const SALT_ROUNDS = 10;

export const REDIS_KEYS = {
  users: {
    prefix: 'users',
    keys: {
      username: 'username',
    },
  },
};
