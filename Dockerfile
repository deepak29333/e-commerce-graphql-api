# Use the official Node.js image as the base image
FROM node:22

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Enable Corepack
RUN corepack enable
RUN corepack prepare yarn@4.5.0 --activate

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["sh", "-c", "yarn migrate && yarn dev"]

#CMD ["sh", "-c", "npx prisma migrate deploy && yarn dev"]
# CMD ["yarn","migrate"]
# CMD ["yarn", "dev"]