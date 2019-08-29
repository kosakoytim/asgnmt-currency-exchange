# Set environment
FROM node:9.6.1

# Set where the app run
WORKDIR /app

# Copy the current directory to docker image
ADD . /app

# Install dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts

# Run command on docker terminal
CMD ["npm", "start"]

# Run applications like -> docker run -p 3000:3000 (repo):(tag)