FROM node:8.2

RUN apt-get update && \
    apt-get install -y nginx

ENV TERM=xterm
ENV ROOT /var/www/roll-up-the-stats

# make this cache-able
RUN mkdir -p $ROOT/dist && \
    mkdir -p $ROOT/src
COPY package.json $ROOT/src/

WORKDIR $ROOT/src
RUN npm install --loglevel=warn

# build & test
COPY . $ROOT/src/
RUN npm run build && npm run test

# start sever
CMD ./run.sh
