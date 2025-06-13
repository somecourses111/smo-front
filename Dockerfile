FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

ARG REACT_APP_API_URL

ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env

RUN npm run build

RUN npm install -g serve 

EXPOSE 8080

ENV PORT=8080

CMD ["sh", "-c", "serve -s build -l $PORT"]
