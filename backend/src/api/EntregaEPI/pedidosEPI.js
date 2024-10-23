const { poolPromise } = require('../../config/dbConfig');

const pedidos_epi = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`
                SELECT 
                EPI.EPI_CODIGO,
                EPI.EPI_REGISTRO_FUN,
                FUN.FUN_NOME,
                EPI.EPI_DATA,
                EPI.EPI_ITEM,
                EPI.EPI_QUANTIDADE,
                EPI.EPI_CONTA,
                EPI.EPI_SUB_CONTA,
                EPI.EPI_SECAO,
                EPI.EPI_DESCRICAO,
                EPI.EPI_AREA,
                EPI.EPI_TURNO,
                EPI.EPI_DATA_ENTREGA,
                EPI.EPI_QUANTIDADE_ENTREGA
                FROM 
                RELATORIO_EPI EPI
                LEFT JOIN 
                FUNCIONARIO REQ ON EPI.EPI_REGISTRO_REQ = REQ.FUN_REGISTRO
                LEFT JOIN 
                FUNCIONARIO FUN ON EPI.EPI_REGISTRO_FUN = FUN.FUN_REGISTRO
                WHERE 
                EPI.EPI_DATA >= DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()) - 2, 0)
                AND EPI.EPI_DATA < DATEADD(WEEK, DATEDIFF(WEEK, 0, GETDATE()) + 1, 0)
                AND EPI.EPI_DATA_ENTREGA IS NULL
                AND EPI.EPI_FLAG = 2
                ORDER BY EPI.EPI_DATA DESC;
            `);

        res.json(result.recordset);
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    pedidos_epi
};