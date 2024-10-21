const { poolPromise } = require('../../config/dbConfig');

const area_epi = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`select * from area_EPI where aepi_flag = 0`);

        res.json(result.recordset);
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    area_epi
};