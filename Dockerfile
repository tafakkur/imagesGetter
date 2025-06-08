FROM node:22.16.0-alpine

RUN mkdir -p /home/imageGetter && chown -R node:node /home/imageGetter

WORKDIR /home/imageGetter

COPY *.json ./

COPY *.js ./

USER node

COPY --chown=node:node . .

# CMD [ "node", "app.js" ]
CMD [ "node", "get-images.js" ]