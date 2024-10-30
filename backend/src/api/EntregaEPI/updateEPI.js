const { poolPromise } = require('../../config/dbConfig');

const update_epi = async (req, res) => {
    const { id, item, descricao, conta, ca } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', id)
            .input('item', item)
            .input('descricao', descricao)
            .input('conta', conta)
            .input('ca', ca)
            .query(`UPDATE CONTROLE_EPI SET CEPI_CODIGO = @item, CEPI_DESCRICAO = @descricao, CEPI_CONTA = @conta, CEPI_CA = @ca WHERE CEPI_ID = @id`);
        res.json(result.recordset);
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    update_epi
};