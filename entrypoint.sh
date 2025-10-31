#!/bin/sh

sed -i "s|<head>|<head><script>window.__ENV__ = { \
  BASE_URL: \"${BASE_URL}\", \
};</script>|" /usr/share/nginx/html/index.html


nginx -g 'daemon off;'