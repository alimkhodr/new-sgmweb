const { poolPromise } = require('../../config/dbConfig');

const desativa_epi = async (req, res) => {
    const { id } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id)
            .query(`UPDATE CONTROLE_EPI SET CEPI_FLAG = 1 WHERE CEPI_ID = @id`);
        res.json(result.recordset);
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    desativa_epi
};