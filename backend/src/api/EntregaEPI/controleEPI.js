const { poolPromise } = require('../../config/dbConfig');

const controle_epi = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT * FROM CONTROLE_EPI`);

        res.json(result.recordset);
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    controle_epi
};