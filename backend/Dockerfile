FROM node:16.5

WORKDIR /usr/app

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "dist/app.js"]