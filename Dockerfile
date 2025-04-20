# Dockerfile for Discord Admin Message Bot
# Use official Node.js 16 LTS image
FROM node:16

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Start the bot
CMD ["node", "index.js"]
