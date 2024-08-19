const { poolPromise } = require('../config/dbConfig');

const list_form_scrap = async (req, res) => {
    const { formulario } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('formulario', formulario)
            .query(`SELECT RSCP_CODIGO AS 'ID', RSCP_PART_NUMBER AS 'PN',  CONVERT(varchar(10),RSCP_QUANTIDADE) + ' (' + CONVERT(varchar(5),RSCP_MEDIDA) + ')' AS 'QTD', 
                    CONVERT(VARCHAR, RSCP_MAQUINA + RSCP_CT) AS 'CT/MAQ', CONVERT(DATE, RSCP_DATA) AS 'DATA', RSCP_REGISTRO AS 'REGISTRO', RSCP_CARTAO AS 'CARTÃO', RSCP_LIMPEZA AS 'LIMPEZA' 
                    FROM RELATORIO_SCRAP WHERE RSCP_CONTROLE = @formulario`);
        
        const columns = result.recordset.length > 0 
            ? Object.keys(result.recordset[0]).map(key => ({ 
                width: 120, 
                label: key, 
                dataKey: key 
            })) 
            : [];

        res.json({ columns, data: result.recordset });
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    list_form_scrap
};
