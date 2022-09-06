FROM node:14

WORKDIR /app

COPY /appx/package.json .

RUN npm install

COPY /app .

EXPOSE 5000

CMD [ "npm", "start" ]