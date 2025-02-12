FROM node:23-alpine3.20

WORKDIR /code

COPY . /code/

RUN npm install

CMD ["node", "index.js"]
