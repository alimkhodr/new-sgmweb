const { poolPromise } = require('../../config/dbConfig');

const dep_conta = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT DISTINCT DEP_CONTA FROM DEPARTAMENTO`);

        res.json(result.recordset);
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    dep_conta
};