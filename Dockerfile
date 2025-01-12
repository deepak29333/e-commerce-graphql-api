FROM node:22-slim

WORKDIR /app

# Copy all files
COPY . .

# Enable Corepack and set up Yarn with non-root user
RUN corepack enable && \
    corepack prepare yarn@4.5.3 --activate && \
    chown -R node:node /app

# Switch to non-root user
USER node

# Install dependencies
RUN yarn install

# Generate Prisma client
RUN yarn prisma generate

# Build the application
RUN yarn build

EXPOSE 3000

# Set environment variable to indicate production
ENV NODE_ENV=production

# Start command
CMD ["yarn", "start-production"]