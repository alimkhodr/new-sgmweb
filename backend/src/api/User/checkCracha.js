const { poolPromise } = require('../../config/dbConfig');

const checkCodin = async (req, res) => {
    const barcode = req.query.barcode;
    try {
      if (!barcode) {
        return res.status(400).send('O crachá de usuário deve ser fornecido.');
      }
      const pool = await poolPromise;
      const result = await pool.request()
        .input('barcode', barcode)
        .query(`SELECT FUN_NOME FROM FUNCIONARIO WHERE FUN_CODIN = @barcode AND FUN_STATUS = 'ATIVO'`);
  
      if (result.recordset.length === 0) {
        return res.status(204).send('Usuário não encontrado.');
      } else {
        return res.json(result.recordset[0]);
      }
    } catch (error) {
      console.error('Erro no servidor:', error);
      res.status(500).send('Erro no servidor');
    }
  };
  

module.exports = {
    checkCodin
};
