FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy project files
COPY . .

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env

# Build the app
RUN npm run build

# Install serve to run the application
RUN npm install -g serve 

# # Expose port 3000
# EXPOSE 3000

ENV PORT=8080

CMD ["sh", "-c", "serve -s build -l $PORT"]
