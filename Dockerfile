FROM node:latest

#Create working directory
RUN mkdir -p /usr/src/bot

#Change to working directory
WORKDIR /usr/src/bot

#Copy package.json to working directory, install dependencies using NPM
COPY package.json /usr/src/bot
RUN npm install

#Copy bot files over
COPY . /usr/src/bot

#Entry command
CMD ["node", "index.js"]