FROM node:20.11.1-alpine as development

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY --chown=node:node package*.json yarn.lock ./

# Install the application dependencies
RUN yarn --frozen-lockfile

# Copy the rest of the application files
COPY . .

RUN yarn db:deploy

# Build the NestJS application
RUN yarn build

# Command to run the application
CMD ["node", "dist/src/main"]