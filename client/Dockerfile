FROM node:16.0.0-alpine

ENV HOME="/app" \
    LANG=C.UTF-8 \
    TZ=Asia/Tokyo

WORKDIR ${HOME}

RUN apk update && \
    apk upgrade && \
    npm install -g npm

ENV HOST 0.0.0.0
EXPOSE 3000

