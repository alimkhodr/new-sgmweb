# Dockerfile do Backend
FROM node:18

WORKDIR /app

# Copie os arquivos de dependência
COPY package*.json ./

# Instale todas as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta correta
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]
