FROM node:alpine
WORKDIR /url_shortner
COPY package.json /url_shortner
RUN yarn
COPY . /url_shortner
CMD [ "node","index.js" ]
