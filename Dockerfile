## Use the official Node.js image as the base image
#FROM node:20.11.0-alpine AS base
#
#FROM base AS deps
## Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
#RUN apk add --no-cache libc6-compat
#
## Set the working directory inside the container
#WORKDIR /usr/src/app
#
## Install the application dependencies
#COPY package.json yarn.lock* package-lock.json* ./
#RUN yarn --frozen-lockfile
#
#ENV DATABASE_URL="postgresql://knowledgebase-user:knowledgebase-password@localhost:5430/knowledgebase-db?schema=public"
#
## Rebuild the source code only when needed
#FROM base AS builder
#WORKDIR /usr/src/app
#COPY --from=deps /app/node_modules ./node_modules
#COPY . .
#
## Build the NestJS application
#RUN npm run build
#
#FROM base AS runner
#WORKDIR /usr/src/app
#
#RUN addgroup --system --gid 1001 nodejs
#RUN adduser --system --uid 1001 nestjs
#
#USER nestjs
#
## Expose the application port
#EXPOSE 4200
#
## Command to run the application
#CMD ["node", "dist/main"]

# syntax=docker/dockerfile:1

# Use the official Node.js image as the base image
FROM node:20.11.1

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json yarn.lock ./

# Install the application dependencies
RUN yarn install

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

# Copy the rest of the application files
COPY . .

#RUN yarn db:migrate

RUN yarn db:deploy

# Build the NestJS application
RUN yarn build

# Command to run the application
CMD ["node", "dist/src/main"]