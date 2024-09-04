const { poolPromise } = require('../../config/dbConfig');

const user_data = async (req, res) => {
    const username = req.query.username; 
    try {
        if (!username) {
            return res.status(400).send('O nome de usuário deve ser fornecido.');
        }
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', username)
            .query('SELECT * FROM FUNCIONARIO WHERE FUN_REGISTRO = @username');
        
        if (result.recordset.length === 0) {
            return res.status(404).send('Usuário não encontrado.');
        }
        
        res.json(result.recordset[0]);
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    user_data
};
