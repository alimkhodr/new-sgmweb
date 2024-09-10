const { poolPromise } = require('../../config/dbConfig');
const jwt = require('jsonwebtoken');

const user_data = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', userId)
            .query('SELECT * FROM FUNCIONARIO WHERE FUN_REGISTRO = @userId');

        if (result.recordset.length === 0) {
            return res.status(404).send('Usuário não encontrado');
        }

        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    user_data
};