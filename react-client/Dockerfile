FROM node:10.15.0-alpine

RUN mkdir -p ./react-client

WORKDIR /react-client

COPY package*.json ./

RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

RUN npm install

COPY . .

EXPOSE 3005

CMD npm start
