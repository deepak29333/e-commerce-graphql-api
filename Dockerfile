FROM node:22-alpine

WORKDIR /app
RUN apk add --no-cache openssl

# Copy package files
COPY package.json yarn.lock ./
COPY .yarnrc.yml ./

# Enable Corepack and install dependencies
RUN corepack enable
RUN yarn install

# Copy project files
COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./

# Generate Prisma client
RUN yarn prisma generate

# Build TypeScript
RUN yarn build

# Expose port
EXPOSE 4000

# Set environment variables
ENV NODE_ENV=production

# Start the server
CMD ["yarn", "start-production"]