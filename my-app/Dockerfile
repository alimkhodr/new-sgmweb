# Use uma imagem Node.js para o frontend
FROM node:18

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e instale as dependências
COPY package*.json ./
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Copie os certificados SSL para o container
COPY ../certs/selfsigned.key /etc/ssl/private/selfsigned.key
COPY ../certs/selfsigned.crt /etc/ssl/certs/selfsigned.crt

# Exponha a porta usada pelo Vite (HTTPS)
EXPOSE 5173

# Comando para rodar o Vite dev server com HTTPS
CMD ["npm", "run", "dev"]
