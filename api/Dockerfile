FROM node:16

# Create app directory
WORKDIR /usr/src/api

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4321

CMD ["node", "server.js"]

# docker build . -t class-points-backend
# docker run  --env-file=.env -p 4321:4321 -p 3306:3306 class-points-backend

