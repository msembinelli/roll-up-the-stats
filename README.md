# Roll Up The Stats

## Getting Started

Clone Repo

```
git clone https://github.com/msembinelli/roll-up-the-stats.git
```

# Server

```
cd roll-up-the-stats/server
```

Create index.js file inside src/config folder. Fill out with the necessary credentials.

example index.js:

```
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

export const ROOT_URL = process.env.NODE_ENV === 'production' ? 'http://roll-up-the-stats.com:3000' : 'http://localhost:3000';
```

Start/build the docker image

```
docker-compose up -d
```

# Client

```
cd ../
```

Start/build the docker image

```
docker-compose up -d
```

### Contributing

contributions are welcome!

### License

MIT
