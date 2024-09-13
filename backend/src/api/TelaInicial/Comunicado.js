const { poolPromise } = require('../../config/dbConfig');

const comunicados = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT * FROM TAB_COMUNICADOS WHERE URL != ''`);
        if (result.recordset.length !== 0) {
            return res.json(result.recordset);
        }
        res.status(404).send('Nenhum comunicado encontrado');
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    comunicados
};
