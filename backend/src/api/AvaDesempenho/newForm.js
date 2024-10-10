const { poolPromise } = require('../../config/dbConfig');
const jwt = require('jsonwebtoken');

const createNewFormAva = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = decoded.id;
    const { respostas, resultado, area_atuacao, avaliacao1, obs1, avaliacao2, obs2, planoAcao, registro, userType } = req.body;
    const lider = (userType === 'COORDENADOR' || userType === 'GESTOR') ? registro?.lider : user;
    const coordenador = userType === 'COORDENADOR' ? user?.coordenador : (userType === 'GESTOR' ? registro?.coordenador : null);

    try {
        // console.log(user)
        // console.log(respostas, resultado, area_atuacao, avaliacao1, obs1, avaliacao2, obs2, planoAcao, registro, lider, coordenador, userType)
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Resultado', resultado)
            .input('Avaliacao1', avaliacao1)
            .input('Obs1', obs1)
            .input('Avaliacao2', avaliacao2)
            .input('Obs2', obs2)
            .input('PlanoAcao', planoAcao || '')
            .input('Registro', registro)
            .input('Lider', lider)
            .input('Coordenador', coordenador)
            .input('AreaAtuacao', area_atuacao)
            .query(`INSERT INTO TAB_AVALIACAO_DESEMPENHO 
            (DATA, FLAG, RESULTADO, AVALIACAO1_1, OBS1_1, AVALIACAO1_2, OBS1_2, PLANO_ACAO, REGISTRO_FUNCIONARIO, REGISTRO_LIDER, REGISTRO_COORDENADOR, AREA_ATUACAO) 
            OUTPUT INSERTED.ID 
            VALUES ((SELECT GETDATE()), 0, @Resultado, @Avaliacao1, @Obs1, @Avaliacao2, @Obs2, @PlanoAcao, @Registro, @Lider, @Coordenador, @AreaAtuacao)`);

        const formId = result.recordset[0].ID;

        // Segundo insert (TAB_AVALIACAO_RESPOSTAS)
        for (let i = 0; i < respostas.length; i++) {
            if (respostas[i]) {
                await pool.request()
                    .input('id_avaliacao', formId)
                    .input('resposta', respostas[i])
                    .query(`INSERT INTO TAB_AVALIACAO_RESPOSTAS (FK_AVALIACAO, FK_PERGUNTA, RESPOSTA) 
                    VALUES (@id_avaliacao, ${i+1}, @resposta)`);
            }
        }

        res.status(201).json({ formId });

    } catch (error) {
        console.error('Erro ao criar o formulário:', error);
        res.status(500).send('Erro ao criar o formulário.');
    }
};



module.exports = {
    createNewFormAva
};
