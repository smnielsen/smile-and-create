FROM node:11.7.0-alpine

WORKDIR /app

COPY package.json .
RUN yarn install --quiet

COPY . .
CMD [ "yarn", "start" ]