const { poolPromise } = require('../../config/dbConfig');

const delete_scrap = async (req, res) => {
    const { id } = req.params; // Ajustado para obter o ID da URL

    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', id)
            .query(`DELETE RELATORIO_SCRAP WHERE RSCP_CODIGO = @id`);
        
        res.status(200).send('Registro excluído com sucesso');
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).send('Erro no servidor');
    }
};

module.exports = {
    delete_scrap
};
