const { poolPromise } = require('../../config/dbConfig');

const entrega_epi = async (req, res) => {
    const { qtd, id, item, secao, area } = req.body;
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('qtd', qtd)
            .input('id', id)
            .input('item', item)
            .input('secao', secao)
            .input('area', area)
            .query(`UPDATE RELATORIO_EPI SET EPI_FLAG = 3, EPI_DATA_ENTREGA = GETDATE(), EPI_QUANTIDADE_ENTREGA = @qtd, EPI_ITEM_ENTREGA = @item, EPI_SECAO_ENTREGA = @secao, EPI_AREA_ENTREGA = @area WHERE EPI_CODIGO = @id`);
        res.json(result.recordset);
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    entrega_epi
};