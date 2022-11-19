FROM node:16-alpine AS builder
ENV NODE_ENV=prodcution
ENV REDIS_HOST=172.17.0.1
RUN mkdir /appsrc
WORKDIR /appsrc
COPY package.json package-lock*.json ./
RUN npm ci && npm cache clean --force
COPY . ./
RUN npm run build
RUN npm prune --production


FROM node:16-slim
ENV NODE_ENV=prodcution
ENV REDIS_HOST=redis
EXPOSE 3000

RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json package-lock*.json ./
RUN npm ci && npm cache clean --force
COPY --from=builder --chown=node:node /appsrc/build .
CMD ["node", "index.js"]