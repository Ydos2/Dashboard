FROM node:lts

#COPY ./client /client
#COPY ./server /server

WORKDIR .

RUN npm install
RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
