const { poolPromise } = require('../../config/dbConfig');
const jwt = require('jsonwebtoken');

const createNewForm = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = decoded.id;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('user', user)
            .query("INSERT INTO formulario_scrap(FSCR_REGISTRO, FSCR_STATUS, FSCR_DATA_CRIACAO) OUTPUT INSERTED.FSCR_FORMULARIO VALUES (@user, 'CRIADO', GETDATE())");

        const formId = result.recordset[0].FSCR_FORMULARIO;
        res.status(201).json({ formId });

    } catch (error) {
        console.error('Erro ao criar o formulário:', error);
        res.status(500).send('Erro ao criar o formulário.');
    }
};


module.exports = {
    createNewForm
};
