FROM mcr.microsoft.com/playwright:v1.27.1-focal
# FROM node:16.3.0-alpine
#FROM codeceptjs/codeceptjs
# FROM mcr.microsoft.com/playwright:bionic
#FROM mcr.microsoft.com/playwright:v1.22.0-focal
#FROM mcr.microsoft.com/playwright:next

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm i

COPY . /app/

CMD ["npm", "run", "codeceptjs"]