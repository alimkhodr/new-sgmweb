const { poolPromise } = require('../../config/dbConfig');

const checkUser = async (req, res) => {
    const registro = req.query.registro;
    try {
        if (!registro) {
            return res.status(400).send('O nome de usuário deve ser fornecido.');
        }
        const pool = await poolPromise;
        const result = await pool.request()
            .input('registro', registro)
            .query(`SELECT FUN_REGISTRO FROM FUNCIONARIO WHERE FUN_REGISTRO = @registro AND FUN_STATUS = 'ATIVO'`);
        
        if (result.recordset.length === 0) {
            return res.status(204).send('Usuário não encontrado.');
        }
        else{
            return res.status(200).send('Usuário encontrado.');
        }
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    checkUser
};
