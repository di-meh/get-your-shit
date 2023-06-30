FROM node:lts-alpine as development

WORKDIR /home/node/app

COPY --chown=node:node .npmrc package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN chown -R node:node /home/node

USER node

CMD ["npm", "run", "dev"]

FROM development as build

WORKDIR /home/node/app

ENV NODE_ENV production

RUN npm run build

RUN npm cache clean --force

FROM build as production

WORKDIR /home/node/app

CMD ["node", ".output/server/index.mjs"]