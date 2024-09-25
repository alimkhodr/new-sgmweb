FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY ../certs/selfsigned.key /etc/ssl/private/selfsigned.key
COPY ../certs/selfsigned.crt /etc/ssl/certs/selfsigned.crt
EXPOSE 3000
CMD ["node", "index.js"]
