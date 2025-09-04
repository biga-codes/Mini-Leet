# filepath: lib/Dockerfile
FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install \
  #  && npm install -g serve@latest  - static file for frontend frmwrk
  #  && npm run build \ - not necessary cus no frontend framework
  #  && rm -fr node_modules
COPY . .

EXPOSE 3000
#command is here
CMD ["node", "server.js"]