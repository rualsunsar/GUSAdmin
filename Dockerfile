FROM alpine AS builder

RUN mkdir -p /GUSAdmin

WORKDIR /GUSAdmin

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

RUN apk add --no-cache --update nodejs nodejs-npm

COPY . .

RUN npm config set registry=https://registry.npm.taobao.org \
    && npm install node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

RUN npm install --production \
    && npm run build:prod

RUN rm -rf `ls | egrep -v '(dist)'`

COPY ./server/package.json ./server/package-lock.json ./

RUN npm install --production


FROM alpine

# MAINTAINER
LABEL name="GUSAdmin"
LABEL version="1.0.1"
LABEL author="rualsunsar"
LABEL maintainer="rualsunsar"
LABEL description="GUSAdmin application"

RUN mkdir -p /GUSAdmin \
    && mkdir -p /GUSAdmin/logs

WORKDIR /GUSAdmin

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

RUN apk add --no-cache --update nodejs nodejs-npm

COPY --from=builder /GUSAdmin/node_modules ./node_modules
COPY --from=builder /GUSAdmin/dist ./dist
COPY ./server ./

RUN find . -type d -name '.[^.]*' -prune -exec echo rm -rf {} + \
    && rm -rf `ls | egrep -v '(dist|node_modules|model|router|utils|app.js|pm2.json|package.json|package-lock.json)'`

RUN npm config set registry=https://registry.npm.taobao.org \
    && npm install -g pm2

# 设置时区
RUN apk add -U tzdata \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/lcoaltime \
    && echo 'Asia/Shanghai' > /etc/timezone

ENV TZ=Asia/Shanghai


# 新建一个用户www 并设置项目目录用户组
RUN adduser -D -H www \
    && chown -R www /GUSAdmin

ENV NODE_ENV=production


EXPOSE 8002

CMD ["pm2-docker", "pm2.json"]
