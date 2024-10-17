
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

WORKDIR /usr/src/app

COPY . .

#COPY .env .

EXPOSE 5002

CMD [ "npm", "start" ]