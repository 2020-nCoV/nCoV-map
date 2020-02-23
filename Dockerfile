FROM node:12 AS build-env
WORKDIR /app
COPY ./package.json . 
COPY ./package-lock.json . 
RUN npm install --registry=http://registry.npm.taobao.org
COPY . .
RUN node -v 
RUN npm -v
RUN npm run build

FROM nginx

WORKDIR /usr/share/nginx/html

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=build-env /app/dist /usr/share/nginx/html/

EXPOSE 80

