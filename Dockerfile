# syntax=docker/dockerfile:1
# Lay Baby Lay — server-rendered Express + React app.
#
# server.js compiles JSX on the fly via @babel/register, and the SSR path pulls
# in the full app dependency tree (including several packages declared under
# devDependencies). We therefore install ALL dependencies and keep the source +
# node_modules in the final image rather than pruning to production-only.
FROM node:20-bookworm-slim

WORKDIR /app

# Install dependencies first for better layer caching. NODE_ENV is intentionally
# left unset here so devDependencies (babel toolchain, build tools) are included.
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile && yarn cache clean

# Copy the source and build the client bundles into dist/.
COPY . .
RUN yarn build

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]
