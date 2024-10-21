const { poolPromise } = require('../../config/dbConfig');

const recusa_epi = async (req, res) => {
    const { id } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id)
            .query(`UPDATE RELATORIO_EPI SET EPI_FLAG = 4, EPI_DATA_ENTREGA = GETDATE() WHERE EPI_CODIGO = @id`);
        res.json(result.recordset);
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    recusa_epi
};