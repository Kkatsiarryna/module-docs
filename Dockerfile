FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

RUN apk add --no-cache gettext

COPY default.conf.template /etc/nginx/templates/default.conf.template

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

RUN sed -i '/<script type="module"/i <script>window.__ENV__ = { BASE_URL: "${BASE_URL}" };</script>' /usr/share/nginx/html/index.html

EXPOSE 80

#CMD ["nginx", "-g", "daemon off;"]

CMD ["/bin/sh", "-c", \
  "envsubst '${BASE_URL}' < /usr/share/nginx/html/index.html > /usr/share/nginx/html/index.html.tmp && \
   mv /usr/share/nginx/html/index.html.tmp /usr/share/nginx/html/index.html && \
   envsubst '${BASE_URL}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && \
   nginx -g 'daemon off;'"]
