# Dockerfile do Frontend
FROM node:18

WORKDIR /app

# Copie os arquivos de dependência
COPY package*.json ./

# Instale todas as dependências, incluindo devDependencies
RUN npm install --omit=prod

# Copie o restante dos arquivos do projeto
COPY . .

# Exponha a porta correta
EXPOSE 5173

# Comando para iniciar o Vite
CMD ["npm", "run", "dev"]
