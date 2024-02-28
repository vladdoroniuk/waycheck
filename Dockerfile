# Development
FROM node:21.6.1-bullseye-slim AS development
WORKDIR /usr/src/app
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node

# Build
FROM node:21.6.1-bullseye-slim AS build
WORKDIR /usr/src/app
ARG APP_NAME
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN npm run db:gen
RUN npm run build ${APP_NAME}
RUN npm ci --only=production && npm cache clean --force
USER node

# Production
FROM node:21.6.1-bullseye-slim AS production
WORKDIR /usr/src/app
ARG APP_NAME
ENV NODE_ENV production
# ENV DOCKER_CONTAINER true
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=build /usr/src/app/scripts ./scripts
CMD ["./scripts/startup.sh"]