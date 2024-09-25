# Use a versão do Node.js
FROM node:18

# Defina o diretório de trabalho no container
WORKDIR /app

# Copie o package.json e instale as dependências
COPY package*.json ./
RUN npm install

# Copie o restante da aplicação
COPY . .

# Copie os certificados SSL para o container
COPY ../certs/selfsigned.key /etc/ssl/private/selfsigned.key
COPY ../certs/selfsigned.crt /etc/ssl/certs/selfsigned.crt

# Exponha a porta do backend (HTTPS)
EXPOSE 3000

# Comando para rodar o backend com HTTPS
CMD ["node", "index.js"]
