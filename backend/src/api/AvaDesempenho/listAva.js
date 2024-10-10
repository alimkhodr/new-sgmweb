const { poolPromise } = require('../../config/dbConfig');

const list_ava = async (req, res) => {
    const { mes, ano, tipo } = req.query;

    let query = `
        SELECT FUN_REGISTRO, FUN_NOME, FUN_DATA_ADMISSAO, FUN_FUNCAO, FUN_CR,
        (CASE 
            WHEN FUN_TURNO = 'JAM-100 | 06h55as16h43 | SegSex |T1|_P16' THEN '1º Turno'
            WHEN FUN_TURNO = 'JAM-200 | 16h33as01h51 | SegSex |T2|_P16' THEN '2º Turno'
            WHEN FUN_TURNO = 'JAM-201 | 16h33as01h51 | QuaDom |T2|_P16' THEN '2º Turno'
            WHEN FUN_TURNO = 'JAM-300 | 01h05as07h05 | SegSex |T3|_P16' THEN '3º Turno'
            WHEN FUN_TURNO = 'JAM-300 | 22h07as07h05 | SegSex |T3|_P16' THEN '3º Turno'
        END) AS TURNO 
        FROM FUNCIONARIO
        WHERE MONTH(FUN_DATA_ADMISSAO) = @mes 
        AND FUN_STATUS = 'ATIVO'
        AND YEAR(FUN_DATA_ADMISSAO) <> @ano
        AND FUN_REGISTRO NOT IN (
            SELECT REGISTRO_FUNCIONARIO FROM TAB_AVALIACAO_DESEMPENHO 
            WHERE REGISTRO_FUNCIONARIO = FUN_REGISTRO
            AND MONTH(DATA) = @mes
        )
    `;

    // Modifica a query de acordo com o tipo de usuário
    if (tipo === 'COORDENADOR') {
        query += `
            AND FUN_REGISTRO IN (
                SELECT REGISTRO FROM TAB_AVALIACAO_DESEMPENHO_COORDENADOR 
                WHERE REGISTRO = FUN_REGISTRO AND CARGO = 'LÍDER'
            )
        `;
    } else if (tipo === 'GESTOR') {
        query += `
            AND FUN_REGISTRO IN (
                SELECT REGISTRO FROM TAB_AVALIACAO_DESEMPENHO_COORDENADOR 
                WHERE REGISTRO = FUN_REGISTRO AND CARGO = 'COORDENADOR'
            )
        `;
    } else {
        query += `
            AND (FUN_FUNCAO LIKE '%OPERADOR%' OR FUN_FUNCAO LIKE '%LIDER%') 
            AND FUN_CAT = 'Horista Direto' 
            AND FUN_REGISTRO < 21000
        `;
    }

    query += ' ORDER BY FUN_REGISTRO';

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('mes', mes)
            .input('ano', ano)
            .query(query);

        res.json(result.recordset);
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    list_ava
};
