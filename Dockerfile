# Use the official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /srv/app

# Copy the package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]
