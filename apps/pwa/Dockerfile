FROM node:lts-alpine as development

WORKDIR /home/node/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --chown=node:node .npmrc package.json pnpm-lock.yaml ./

RUN pnpm i

COPY --chown=node:node . .

RUN chown -R node:node /home/node

USER node

CMD ["pnpm", "run", "dev:pwa"]

FROM development as build

WORKDIR /home/node/app

ENV NODE_ENV production

RUN pnpm run build

# RUN npm cache clean --force

FROM build as production

WORKDIR /home/node/app

CMD ["node", ".output/server/index.mjs"]