# Use the official Node.js 18 image with Alpine
FROM node:18-alpine AS base

# Set the working directory
WORKDIR /app

COPY . .
COPY .env .env

# Install dependencies
RUN npm install

# Copy the rest of the application code

# Build the Next.js application
RUN npm run build

# Only copy the necessary files from the build stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built files from the base stage
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/next.config.mjs ./next.config.mjs
COPY --from=base /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
