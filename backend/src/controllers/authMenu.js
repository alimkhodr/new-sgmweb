const { poolPromise } = require('../config/dbConfig');
const jwt = require('jsonwebtoken');

const ace_telas = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', userId)
            .query('SELECT ACE_TELA FROM ACESSO WHERE ACE_REGISTRO = @userId');
        
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
