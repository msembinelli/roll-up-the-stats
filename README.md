## react-docker-app

Build a React.js app with a compile, bundle, and test pipeline already in place.

![may-29-2016 16-21-04](https://cloud.githubusercontent.com/assets/2729079/15636596/79ef3270-25b9-11e6-9523-1f8a04e20a0d.gif)

### Development

Get [Docker](https://docs.docker.com/linux/step_one/) (preferably [Docker Mac Beta](beta.docker.com) if you're on a Mac).

#### In Docker

Start the containers, and write your application.


```
$ docker-compose up -d
$ docker-compose logs -f
```


We support [Docker Mac](https://blog.docker.com/2016/03/docker-for-mac-windows-beta/). To activate it

```
$ echo "DOCKER_MAC_BETA=1" >> .env
```

Visit `http://$(docker-machine ip):8000` to see your changes if you're not using Docker Mac, else visit `http://localhost:8000`.

#### Not in Docker

This is discouraged, but there might be some unforeseen reason you'd like to develop outside the container. In that case, just run

```
$ npm run dev
```

and visit `http://localhost:8000`.

#### Debugging

Development tooling includes

- sourcemaps
- [Redux DevTools](https://github.com/gaearon/redux-devtools#chrome-extension) - for monitoring state and "time travel"
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) - inspect components in the DOM

### Production

Set `NODE_ENV=production` in `.env`, then

```
$ docker-compose up -d
```

The build directory in the container is `/var/www/react-docker-app/dist`. These files are served by an [NGINX](https://www.nginx.com/) front-end. Logs are located in `/var/www/react-docker-app/logs`.

#### ES6 and SASS modules

ES6 and SASS modules can be imported using relative file URLs or using Webpack's module resolution from the root `app/`

```javascript
import { ... } from 'auth' // maps to './auth';
import { ... } from 'util' // maps to './util';
```

```sass
@import '~app.scss';
@import '~counter/counter.scss';
```

### Features

- [x] React.js v15.0.x
- [x] React Router
- [x] Redux
- [x] Redux Thunk
- [x] reselect
- [x] ES6 everywhere
- [x] JSX/SASS Hot Reloading
- [x] Auth0 authentication
- [x] [Material UI](https://github.com/callemall/material-ui)
- [x] sourcemaps
- [x] continuous bundling
- [x] continuous linting
- [ ] continuous testing
- [x] minification when `NODE_ENV=production`


