FROM node:20.11.1-alpine AS base

FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy application dependency
COPY --chown=node:node package.json package-lock.json yarn.lock ./
# Install the application dependencies
RUN yarn --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder

# Bundle app source
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN yarn db:deploy

RUN yarn build

FROM base AS runner

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --chown=node:nestjs --from=builder /usr/src/app/node_modules ./node_modules
COPY --chown=node:nestjs --from=builder /usr/src/app/dist ./dist

USER nestjs

# Command to run the application
CMD ["node", "dist/src/main"]