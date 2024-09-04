const { poolPromise } = require('../config/dbConfig');

const ace_telas = async (req, res) => {
    const username = req.query.username;
    try {
        if (!username) {
            return res.status(400).send('O usuário deve ser fornecido.');
        }
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', username)
            .query('SELECT ACE_TELA FROM ACESSO WHERE ACE_REGISTRO = @username');
        
        if (result.recordset.length === 0) {
            return res.status(404).send('Telas não encontradas.');
        }
        
        const telas = result.recordset.map((row) => row.ACE_TELA);
        res.json(telas);
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    ace_telas
};
