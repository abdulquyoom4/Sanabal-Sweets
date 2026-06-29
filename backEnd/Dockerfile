# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /backEnd

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy rest of the source code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]