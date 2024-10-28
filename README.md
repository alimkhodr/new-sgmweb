# NEW SGM
>Sistema Gerenciador de Manufatura

## Pré-requisitos
- [Node.js](https://nodejs.org/en/)

## Clonando o Repositório

Clone este repositório usando o comando:

```bash
git [clone https://github.com/iNineBD/GeoTrack-4Sem2024.git](https://github.com/aptivjam/sgmweb)
```

## Rodando BackEnd

Rode o BackEnd usando o comando:

```bash
cd backend
npm install (primeira vez)
node index.js
```

## Rodando FrontEnd

Rode o FrontEnd usando o comando:

```bash
cd my-app
npm install (primeira vez)
npm run dev
```

## Atualizando aplicação no servidor

Após atualizar aplicação e fazer o commit siga estes passos:

1. Acesso remoto no mfgsvr3
2. Abrir terminal
3. Ir para `C:\new-sgmweb`
4. Apagar imagens antigas `docker-compose down --rmi all`
5. Atualizar com `git pull`
6. Publicar com `docker-compose up --build`

## Partes importantes da aplicação
/auth/ace_telas
>API de gerencionamento de telas, ela é ultilizada em `my-app\src\config\menuConfig.tsx` para controlar as telas no menu para o usuário e no `my-app\src\App.tsx` para o usuário não acessar diretamente com o link, caso o usuário não tenha acessoe tente acessar direto pelo link vem uma mensagem que ele não tem acesso.

my-app\src\App.tsx
>Além de conter o gerencionamento de telas ele controla as rotas do frontend.

my-app\src\theme.ts
>Gerenciador do thema da aplicação com o laranja `#F84018` como secondary e `white` ou `black` como primary.

backend\.env
>Arquivo de configuração do backend, ele não é commitado para o github, caso tenha que altera-lo tera que alterar direto no servidor.

backend\index.js
>Arquivo principal do backend.

backend\src\routes\authRoutes.js
>Arquivo de rotas do backend, sempre que criar uma API tem que criar uma rota para ela.

certs
>Pasta onde contém os certificados para o site ser um link https.

docker-compose.yml
>Arquivo onde junta `Dockerfile.backend` e `Dockerfile.my-app` na docker.


