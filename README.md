<p align="center"><img src="https://github.com/aptivjam/new-sgmweb/blob/master/my-app/src/assets/images/logo/sgmweb.svg" width="20%"></p>
<p align="center">Sistema de Gestão de Manufatura - Web</p>

### Tecnologias Utilizadas
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

### Pré-requisitos
- [Node.js](https://nodejs.org/en/)

### Clonando o Repositório
Clone este repositório usando o comando:
```bash
git clone https://github.com/aptivjam/new-sgmweb
```

### Rodando BackEnd
Rode o BackEnd usando o comando:
```bash
cd backend
npm install (primeira vez)
node index.js
```

### Rodando FrontEnd
Rode o FrontEnd usando o comando:
```bash
cd my-app
npm install (primeira vez)
npm run dev
```

### Atualizando aplicação no servidor
Após atualizar aplicação e fazer o commit siga estes passos:
1. Acesso remoto no mfgsvr3
2. Abrir terminal
3. Ir para `C:\new-sgmweb`
4. Apagar imagens antigas `docker-compose down --rmi all`
5. Atualizar com `git pull`
6. Publicar com `docker-compose up --build`

### Partes importantes da aplicação
/auth/ace_telas
>API de gerencionamento de telas, ela é ultilizada em `my-app\src\config\menuConfig.tsx` para controlar as telas no menu para o usuário e no `my-app\src\App.tsx` para o usuário não acessar diretamente com o link, caso o usuário não tenha acessoe tente acessar direto pelo link vem uma mensagem que ele não tem acesso.

my-app\src\App.tsx
>Além de conter o gerencionamento de telas ele controla as rotas do frontend.

my-app\src\theme.ts
>Gerenciador do thema da aplicação com o laranja `#F84018` como secondary e `white` ou `black` como primary.

backend\.env
>Arquivo de configuração do backend, ele não é commitado para o github, caso tenha que altera-lo tera que alterar direto no servidor.

backend\src\routes\authRoutes.js
>Arquivo de rotas do backend, sempre que criar uma API tem que criar uma rota para ela.

certs
>Pasta onde contém os certificados para o site ser um link https.

backend\index.js
>Arquivo principal do backend, onde roda a aplicação.

my-app\vite.config.ts
>Arquivo principal do FrontEnd, onde roda a aplicação.

docker-compose.yml
>Arquivo onde junta `Dockerfile.backend` e `Dockerfile.my-app` na docker, ele basicamente roda na docker o que você roda no pc.
<br/>
<p align="center"><img src="https://github.com/user-attachments/assets/bb4c0c56-bf3e-4471-9d88-8056135c8f9f" width="20%"></p>
