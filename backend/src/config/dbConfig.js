const sql = require('mssql');
require('dotenv').config(); // Carregar variáveis de ambiente

const poolPromise = new sql.ConnectionPool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}).connect().then(pool => {
    console.log('Conectado ao banco de dados:', process.env.DB_DATABASE );
    return pool;
}).catch(err => {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
});

module.exports = { poolPromise };
