FROM node:16
WORKDIR .

# RUN "echo REACT_APP_DEV_ENV=TRUE" > .env

COPY ./package*.json ./

RUN npm install

COPY . ./

ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "start" ]