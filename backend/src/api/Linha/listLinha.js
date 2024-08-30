const { poolPromise } = require('../../config/dbConfig');

const list_linha = async (req, res) => {
    const { ct } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('ct', ct)
            .query(`
                SELECT DISTINCT LIN_CT, LIN_MAQUINA 
                FROM Linha 
                WHERE (@ct = '' OR LIN_CT = @ct)
                ORDER BY LIN_CT, LIN_MAQUINA
            `);

        const formattedData = result.recordset.map(row => ({
            CT: row.LIN_CT,
            MAQUINA: row.LIN_MAQUINA,
        }));

        res.json({ data: formattedData });
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    list_linha
};
