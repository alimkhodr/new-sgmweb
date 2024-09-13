const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet'); // Importa o helmet para segurança
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  'https://10.251.42.250:5173',
  'https://192.168.0.160:5173',
  'https://localhost:5173',
];

// Configura CORS
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

// Configura Helmet para segurança adicional
app.use(helmet()); 

// Configura middleware para análise de JSON
app.use(express.json());
app.use(bodyParser.json());

// Configura as rotas
app.use('/api/auth', authRoutes);

// Configuração HTTPS
const options = {
  key: fs.readFileSync('../server-key.pem'),
  cert: fs.readFileSync('../server-cert.pem'),
};

// Criação do servidor HTTPS
https.createServer(options, app).listen(port, () => {
  console.log(`Servidor rodando na porta ${port} (HTTPS)`);
});
