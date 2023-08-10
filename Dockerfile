FROM node:alpine
WORKDIR /url_shortner
COPY package.json /url_shortner
RUN yarn
COPY . /url_shortner
EXPOSE 5000
CMD [ "node","index.js" ]
