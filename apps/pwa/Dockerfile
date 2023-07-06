FROM node:lts-alpine as development

WORKDIR /root/app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY .npmrc package.json pnpm-lock.yaml ./

RUN pnpm config set store-dir /root/app/.pnpm-store/v3 --global && pnpm i

COPY . .

CMD ["pnpm", "run", "dev:pwa"]

FROM development as build

WORKDIR /root/app

ENV NODE_ENV production

RUN pnpm run build

# RUN npm cache clean --force

FROM build as production

WORKDIR /root/app

CMD ["node", ".output/server/index.mjs"]