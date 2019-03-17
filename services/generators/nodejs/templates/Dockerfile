FROM node:10-alpine

ENV SOURCES /app

RUN mkdir -p ${SOURCES} && chown -R node:node ${SOURCES}
WORKDIR ${SOURCES}

USER node

COPY package.json ${SOURCES}/
COPY yarn.lock ${SOURCES}/

RUN yarn install --quiet

COPY src ${SOURCES}/src

EXPOSE 8080

CMD ["npm", "start"]
