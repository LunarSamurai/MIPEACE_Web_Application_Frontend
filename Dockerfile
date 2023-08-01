FROM node:lts-alpine

# Set NODE_ENV to production
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent

# Copy the rest of the application files
COPY . .

# Expose the application's port (assuming the application uses port 3000)
EXPOSE 3000

# Change the ownership of the working directory to the 'node' user
RUN chown -R node /usr/src/app

# Switch to the 'node' user
USER node

# Command to start the application (assuming it uses 'npm start')
CMD ["npm", "start"]
