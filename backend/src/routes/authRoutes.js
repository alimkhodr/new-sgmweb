const express = require('express');
const { login } = require('../controllers/authController');
const { list_form_scrap } = require('../api/Scrap/listScrap');
const { delete_scrap } = require('../api/Scrap/deleteScrap');
const { user_data } = require('../api/User/DataUser');
const { ava_type } = require('../api/AvaDesempenho/avaliadorType');
const { checkUser } = require('../api/User/checkReg');
const { checkCodin } = require('../api/User/checkCracha');
const { list_linha } = require('../api/Linha/listLinha');
const { createNewForm } = require('../api/Scrap/newForm');
const { createNewFormAva } = require('../api/AvaDesempenho/newForm');
const { ace_telas } = require('../controllers/authMenu');
const { fifo } = require('../api/TelaInicial/EtiquetaFifo');
const { comunicados } = require('../api/TelaInicial/Comunicado');
const authenticateToken = require('../middleware/authMiddleware');
const { list_ava } = require('../api/AvaDesempenho/listAva');
const { pedidos_epi } = require('../api/EntregaEPI/pedidosEPI');
const { entrega_epi } = require('../api/EntregaEPI/entregaEPI');
const { recusa_epi } = require('../api/EntregaEPI/recusaEPI');
const { controle_epi } = require('../api/EntregaEPI/controleEPI');
const { dep_conta } = require('../api/Departamento/depConta');
const { dep_secao } = require('../api/Departamento/depSecao');
const { area_epi } = require('../api/EntregaEPI/areaEPI');
const router = express.Router();

// Public Routes
router.post('/login', login);

// Protected Routes
// GET
router.get('/list_form_scrap', authenticateToken, list_form_scrap);
router.get('/user_data', authenticateToken, user_data);
router.get('/ava_type', authenticateToken, ava_type);
router.get('/checkUser', authenticateToken, checkUser);
router.get('/checkCodin', authenticateToken, checkCodin);
router.get('/list_linha', authenticateToken, list_linha);
router.get('/ace_telas', authenticateToken, ace_telas);
router.get('/fifo', authenticateToken, fifo);
router.get('/comunicados', authenticateToken, comunicados);
router.get('/list_ava', authenticateToken, list_ava);
router.get('/pedidos_epi', authenticateToken, pedidos_epi);
router.get('/controle_epi', authenticateToken, controle_epi);
router.get('/dep_conta', authenticateToken, dep_conta);
router.get('/dep_secao', authenticateToken, dep_secao);
router.get('/area_epi', authenticateToken, area_epi);
// POST
router.post('/createNewForm', authenticateToken, createNewForm);
router.post('/createNewFormAva', authenticateToken, createNewFormAva);
// DELETE
router.delete('/delete_scrap/:id', authenticateToken, delete_scrap);
// PUT
router.put('/entrega_epi', authenticateToken, entrega_epi);
router.put('/recusa_epi', authenticateToken, recusa_epi);

router.get('/protected', authenticateToken, (req, res) => {
    res.send('Esta é uma rota protegida');
});

module.exports = router;
