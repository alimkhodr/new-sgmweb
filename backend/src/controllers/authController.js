const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { poolPromise } = require('../config/dbConfig');

const login = async (req, res) => {
    const { username, password } = req.query;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', username)
            .query(`SELECT * FROM FUNCIONARIO WHERE FUN_REGISTRO = @username AND FUN_STATUS = 'ATIVO'`);

        if (result.recordset.length === 0) {
            return res.status(401).send('Usuário não encontrado');
        }

        const user = result.recordset[0];
        const isMatch = password === user.FUN_CPF.substring(0, 6);

        if (!isMatch) {
            return res.status(401).send('Senha incorreta');
        }

        const token = jwt.sign({ id: user.FUN_REGISTRO }, process.env.JWT_SECRET, { expiresIn: 3600, });
        res.json({ token });
    } catch (error) {
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    login
};
