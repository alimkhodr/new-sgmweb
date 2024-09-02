const { poolPromise } = require('../../config/dbConfig');

const createNewForm = async (req, res) => {
    try {
        const user = req.body.user;

        if (!user) {
            return res.status(400).send('O usuário deve ser fornecido.');
        }

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
