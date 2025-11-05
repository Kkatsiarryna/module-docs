FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM nginx:stable-alpine

COPY default.conf.template /etc/nginx/templates/default.conf.template

COPY index.html.template /usr/share/nginx/html/index.html.template

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

RUN apk add --no-cache gettext

EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]

CMD ["/bin/sh", "-c", "envsubst < /usr/share/nginx/html/index.template.html > /usr/share/nginx/html/index.html && nginx -g 'daemon off;'"]
