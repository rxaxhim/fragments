# This is a dockerfile which will be used to build the project and run the tests

# --------------> The build image
FROM node:19-alpine3.15 AS build
# Use / as our working directory
WORKDIR /
# Copy the package.json and package-lock.json files into the working dir (/app)
COPY --chown=node:node . package*.json ./
# Use /app as our working directory
WORKDIR /app
# Install the dependencies
RUN npm install --production


# --------------> Production image
FROM node:19-alpine3.15
LABEL maintainer="Raahim Ghori <mghori2@myseneca.ca>"
LABEL description="Fragments node.js microservice"
# We default to use port 8080 in our service
ENV PORT=8080
# Reduce npm spam when installing within Docker
# https://docs.npmjs.com/cli/v8/using-npm/config#loglevel
ENV NPM_CONFIG_LOGLEVEL=warn
# Disable colour when run inside Docker
# https://docs.npmjs.com/cli/v8/using-npm/config#color
ENV NPM_CONFIG_COLOR=false
# Optimal settings for performance and security
ENV NODE_ENV production
# Use /app as our working directory
WORKDIR /app
# Copy the package.json and package-lock.json files into /app
COPY --chown=node:node . package*.json ./
#copy node into app
COPY --chown=node:node . .
WORKDIR /app/node_modules
COPY --chown=node:node --from=build ./node_modules .
# Install node dependencies defined in package-lock.json
RUN npm ci --only=production
#Run the container as an unprivileged user whenever possible
USER node
WORKDIR /app/src
# Copy src to /app/src/
COPY ./src .
# Copy our HTPASSWD file
WORKDIR /app/tests/htpasswd
COPY ./tests/.htpasswd .
# Start the container by running our server
CMD ["npm", "start"]
# We run our service on port 8080
EXPOSE 8080
