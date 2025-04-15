# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM imbios/bun-node:latest-current-alpine AS base
WORKDIR /usr/src/app
COPY . .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
ENV NODE_ENV=production
RUN pnpm --filter=@elmecsata/ws run build

FROM base AS release
COPY --from=base /usr/src/app/apps/ws/dist /usr/src/app

# run the app
USER bun
ENTRYPOINT [ "bun", "--bun", "run", "index.js" ]