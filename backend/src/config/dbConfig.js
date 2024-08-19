const sql = require('mssql');
require('dotenv').config(); // Carregar variáveis de ambiente

const poolPromise = new sql.ConnectionPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false, // Desative a criptografia se não for necessária
        trustServerCertificate: true // Confie no certificado do servidor
    }
}).connect().then(pool => {
    console.log('Conectado ao banco de dados');
    return pool;
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1); // Encerra o processo se houver um erro na conexão
});

module.exports = { poolPromise };
