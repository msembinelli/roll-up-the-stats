export const dbConfig = {
  secret: 'SomeRandomSecretString',
  db: 'mongodb://localhost:auth/auth',
};

export const emailConfig = {
  service: 'Gmail',
  auth: {
    user: 'test@gmail.com',
    pass: 'Password',
  },
};

export const ROOT_URL = process.env.NODE_ENV === 'production' ? 'http://roll-up-the-stats.com:8000' : 'http://localhost:8000';
