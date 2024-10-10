const { poolPromise } = require('../../config/dbConfig');
const jwt = require('jsonwebtoken');

const ava_type = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', userId)
            .query('SELECT CARGO FROM TAB_AVALIACAO_DESEMPENHO_COORDENADOR WHERE REGISTRO = @userId');
        res.json(result.recordset[0]);
    } catch (error) {
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    ava_type
};