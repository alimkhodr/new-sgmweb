const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [ 
    'https://10.251.42.250:5173',
    'https://localhost:5173', // URL do frontend no desenvolvimento
    //'https://seusite.com' // URL do frontend em produção
];

// Configuração do CORS
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// Opções do certificado SSL
const options = {
    key: fs.readFileSync('../key.pem'),
    cert: fs.readFileSync('../cert.pem'), 
};

// Cria o servidor HTTPS
https.createServer(options, app).listen(port, () => {
  console.log(`Servidor rodando na porta ${port} (HTTPS)`);
});
