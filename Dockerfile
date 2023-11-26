FROM node:20-alpine

ADD package.json .
ADD package-lock.json .

RUN npm install

ADD . .
RUN npm run build
ENV PORT=3000
CMD [ "node", "./dist/index.js" ]