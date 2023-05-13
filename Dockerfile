FROM node:lts-bullseye-slim
LABEL MAINTAINER="Anton Stadie <anton.stadie@icontec.de>"
ENV DEBIAN_FRONTEND=noninteractive
RUN mkdir /opt/michi-helper && mkdir /opt/michi-helper/frontend
COPY ./ /opt/michi-helper/frontend/
WORKDIR /opt/michi-helper/frontend
RUN rm -rf node_modules package-lock.json && npm i --save
RUN chown -R node:node node_modules
EXPOSE 3000 8097
ENTRYPOINT [ "npm", "run", "start" ]