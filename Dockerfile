# Base image
FROM node:alpine

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Unit test
RUN yarn test:cov
# RUN tarn test:e2e

# Creates a "dist" folder with the production build
RUN yarn build

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
