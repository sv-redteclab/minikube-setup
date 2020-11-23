FROM node:lts-alpine

RUN apk --no-cache add --virtual .rundeps curl

WORKDIR /home/node/app

COPY . .
RUN npm install

CMD ["node", "server.js"]
