const express = require('express');
const { login } = require('../controllers/authController');
const { list_form_scrap } = require('../api/Scrap/listScrap');
const { delete_scrap } = require('../api/Scrap/deleteScrap');
const { user_data } = require('../api/User/DataUser');
const { checkUser } = require('../api/User/checkReg');
const { checkCodin } = require('../api/User/checkCracha');
const { list_linha } = require('../api/Linha/listLinha');
const { createNewForm } = require('../api/Scrap/newForm');
const { ace_telas } = require('../controllers/authMenu');
const { fifo } = require('../api/TelaInicial/EtiquetaFifo');
const { comunicados } = require('../api/TelaInicial/Comunicado');
const authenticateToken = require('../middleware/authMiddleware');
const { list_ava } = require('../api/AvaDesempenho/listAva');
const router = express.Router();

// Public Routes
router.post('/login', login);

// Protected Routes
router.get('/list_form_scrap', authenticateToken, list_form_scrap);
router.get('/user_data', authenticateToken, user_data);
router.get('/checkUser', authenticateToken, checkUser);
router.get('/checkCodin', authenticateToken, checkCodin);
router.get('/list_linha', authenticateToken, list_linha);
router.get('/ace_telas', authenticateToken, ace_telas);
router.get('/fifo', authenticateToken, fifo);
router.get('/comunicados', authenticateToken, comunicados);
router.get('/list_ava', authenticateToken, list_ava);
router.post('/createNewForm', authenticateToken, createNewForm);

router.delete('/delete_scrap/:id', authenticateToken, delete_scrap);

router.get('/protected', authenticateToken, (req, res) => {
    res.send('Esta é uma rota protegida');
});

module.exports = router;
