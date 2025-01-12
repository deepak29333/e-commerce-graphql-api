# Use full Node.js image instead of slim
FROM node:22

WORKDIR /app

# Install OpenSSL first
RUN apt-get update -y && \
    apt-get install -y openssl

# Copy package files first for better caching
COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Enable Corepack and set up Yarn
RUN corepack enable && \
    corepack prepare yarn@4.5.3 --activate

# Install dependencies and generate Prisma client
RUN yarn install && \
    yarn prisma generate

# Copy rest of the application
COPY . .

# Set permissions
RUN chown -R node:node /app

# Switch to non-root user
USER node

# Build the application
RUN yarn build

EXPOSE 3000

# Set environment variable to indicate production
ENV NODE_ENV=production

# Start command
CMD ["yarn", "start-production"]