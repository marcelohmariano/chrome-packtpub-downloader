FROM alpine:edge

RUN \
  apk add --no-cache \
    npm \
    zip && \
  \
  npm install -g \
    chrome-webstore-upload-cli \
    download-crx \
    github-release-cli