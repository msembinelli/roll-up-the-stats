FROM node:4.4.4

RUN apt-get update && \
    apt-get install -y nginx && \
    apt-get install -y mongodb

ENV TERM=xterm
ENV ROOT /var/www/roll-up-the-stats-server

# make this cache-able
RUN mkdir -p $ROOT/dist && \
    mkdir -p $ROOT/src
COPY package.json $ROOT/src/

WORKDIR $ROOT/src
RUN npm install --loglevel=warn

# build & test
COPY . $ROOT/src/
RUN npm run build && npm run test

# Start mongo
RUN mkdir -p $ROOT/data/db

# start sever
CMD ./run.sh
