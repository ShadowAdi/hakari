FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

COPY package-lock*.json ./

COPY . .

ENV PORT = 3000

EXPOSE 3000

CMD [ "npm","start" ]