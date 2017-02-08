FROM node:6

WORKDIR /app

RUN apt-get update
RUN apt-get -y upgrade

ADD package.json /app/package.json
RUN npm install

RUN npm install -g pm2

ADD . /app
ENV NODE_ENV=production
RUN npm run build

EXPOSE 3000

CMD ["pm2", "start", "--no-daemon", "process.json", "--only", "web"]
