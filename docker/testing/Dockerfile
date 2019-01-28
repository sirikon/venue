FROM node:10.14-alpine

WORKDIR /app

ADD package.json .
ADD package-lock.json .

RUN npm install

ADD index.js .
ADD .eslintrc.json .
ADD src ./src
ADD test ./test

CMD tail -f /dev/null
