FROM node:10.14-alpine
WORKDIR /app
ADD package.json .
ADD package-lock.json .
ADD index.js .
ADD src ./src
RUN npm install && \
    npm run style:build && \
    rm -rf ./node_modules && \
    npm install --production
ENV NODE_ENV=production
CMD npm start
