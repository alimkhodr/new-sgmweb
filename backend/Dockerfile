FROM node:18

WORKDIR /app

# Copiar apenas o package.json para instalar as dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Agora copiar o restante dos arquivos da aplicação
COPY . .

# Expor a porta usada pela aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
