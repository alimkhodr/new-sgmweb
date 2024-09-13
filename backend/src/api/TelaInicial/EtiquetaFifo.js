const { poolPromise } = require('../../config/dbConfig');

const fifo = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT FIFO_RGB FROM TAB_FIFO WHERE FIFO_MES = MONTH(GETDATE())`);
        if (result.recordset.length != 0) {
            return res.json(result.recordset[0]);
        }
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    fifo
};
