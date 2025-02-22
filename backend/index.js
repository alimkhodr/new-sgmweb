const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');
const https = require('https');
const fs = require('fs');

const app = express();
const port = 3000;

// Gerenciar front que pode acessar
// const allowedOrigins = [
//   'http://10.251.42.250:5173',
//   'http://192.168.0.160:5173',
//   'http://localhost:5173',
//   'https://10.251.42.75',
// ];
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// }));

// Qualquer front acessa
app.use(cors());

// Configura middleware para análise de JSON
app.use(express.json());
app.use(bodyParser.json());

// Configura as rotas
app.use('/api/auth', authRoutes);

// Criação do servidor HTTPS
const options = {
  key: fs.readFileSync('../certs/selfsigned.key'),
  cert: fs.readFileSync('../certs/selfsigned.crt'),
};

https.createServer(options, app).listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// app.listen(port, () => {
//   console.log(`Servidor rodando na porta ${port}`);
// });