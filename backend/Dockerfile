FROM node:20-alpine3.17

WORKDIR /usr/src/app

COPY backend/package.json ./

RUN npm i

COPY backend/ ./

COPY .env ./

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]