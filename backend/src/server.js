const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 5000;

// Lista de origens permitidas
const allowedOrigins = [
    'http://localhost:3000', // URL do frontend no desenvolvimento
    // 'https://seusite.com'    // URL do frontend em produção
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
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
