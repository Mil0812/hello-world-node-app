# Base image: use the official Node.js LTS image
FROM node:20.11.0

# Set the working directory in the container
WORKDIR /srv/node/app

# Install nodemon globally for development environment
RUN npm install -g nodemon

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install any dependencies (none in this case)
RUN npm install

COPY --chown=node:node . .

# Switch to the node user
USER node

RUN if [ "$REBUILD_PRISMA_CLIENT" = "true" ]; then \
    npm run db:sync; \
    fi

EXPOSE 3000

# Expose the debugging port
EXPOSE 9229

# Set the NODE_ENV environment variable to development by default
ENV NODE_ENV=development

# Start the application
CMD ["nodemon", "--inspect=0.0.0.0:9229", "server.js"]
