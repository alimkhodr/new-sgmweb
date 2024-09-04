const express = require('express');
const { login } = require('../controllers/authController');
const { list_form_scrap } = require('../api/Scrap/listScrap');
const { delete_scrap } = require('../api/Scrap/deleteScrap');
const { user_data } = require('../api/User/DataUser');
const { checkUser } = require('../api/User/checkReg');
const { list_linha } = require('../api/Linha/listLinha');
const { createNewForm } = require('../api/Scrap/newForm');
const { ace_telas } = require('../controllers/authMenu');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

// Public Routes
router.get('/login', login);

// Protected Routes
router.get('/list_form_scrap', authenticateToken, list_form_scrap);
router.get('/user_data', authenticateToken, user_data);
router.get('/checkUser', authenticateToken, checkUser);
router.get('/createNewForm', authenticateToken, createNewForm);
router.get('/list_linha', authenticateToken, list_linha);
router.get('/ace_telas', authenticateToken, ace_telas);

router.delete('/delete_scrap/:id', authenticateToken, delete_scrap);

router.get('/protected', authenticateToken, (req, res) => {
    res.send('Esta é uma rota protegida');
});

module.exports = router;
