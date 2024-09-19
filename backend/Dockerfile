# Use a imagem oficial do Node.js como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /indexjs

# Copie o package.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o arquivo index.js para o diretório de trabalho
COPY index.js .

# Exponha a porta que o seu servidor Express vai usar
EXPOSE 3000

# Execute o servidor quando o contêiner for iniciado
CMD ["node", "index.js"]
