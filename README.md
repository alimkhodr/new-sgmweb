<p align="center"><img src="https://github.com/aptivjam/new-sgmweb/blob/master/my-app/src/assets/images/logo/sgmweb.svg" width="20%"></p>
<p align="center">Sistema de Gestão de Manufatura - Web</p>

<p align="center">
[![Next][Next.js]][Next-url]
[![React][React.js]][React-url]
[![Vue][Vue.js]][Vue-url]
[![Angular][Angular.io]][Angular-url]
[![Svelte][Svelte.dev]][Svelte-url]
[![Laravel][Laravel.com]][Laravel-url]
[![Bootstrap][Bootstrap.com]][Bootstrap-url]
[![JQuery][JQuery.com]][JQuery-url]
</p>

## Pré-requisitos
- [Node.js](https://nodejs.org/en/)

## Componentização
- [Material UI](https://mui.com/)
<p>Material UI é uma biblioteca de componentes React de código aberto que implementa o Material Design do Google.</p>

## Conteinerização
- [Docker](https://www.docker.com/)
<p>Docker é uma tecnologia de conteinerização open source projetada para combinar vários processos em um único contêiner.</p>

## Clonando o Repositório
Clone este repositório usando o comando:
```bash
git clone https://github.com/aptivjam/new-sgmweb
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
<br>
<p align="center"><img src="https://github.com/user-attachments/assets/bb4c0c56-bf3e-4471-9d88-8056135c8f9f" width="20%"></p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/

