const { poolPromise } = require('../../config/dbConfig');

const pedidos_epi = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT EPI_CODIGO,EPI_REGISTRO_FUN, FUN.FUN_NOME, EPI_DATA, EPI_ITEM, EPI_QUANTIDADE, 
                    EPI_CONTA, EPI_SUB_CONTA, EPI_SECAO,EPI_DESCRICAO, EPI_AREA, EPI_TURNO,EPI_DATA_ENTREGA,EPI_QUANTIDADE_ENTREGA FROM RELATORIO_EPI 
                    LEFT JOIN FUNCIONARIO REQ ON EPI_REGISTRO_REQ = REQ.FUN_REGISTRO LEFT JOIN FUNCIONARIO FUN ON EPI_REGISTRO_FUN = FUN.FUN_REGISTRO
                    WHERE DATEPART(ISO_WEEK, EPI_DATA) = DATEPART(ISO_WEEK, GETDATE()) AND YEAR(EPI_DATA) = YEAR(GETDATE()) AND EPI_DATA_ENTREGA IS NULL AND EPI_FLAG = 2;`);

        res.json(result.recordset);
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    pedidos_epi
};