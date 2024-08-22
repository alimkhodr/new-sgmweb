const express = require('express');
const { login } = require('../controllers/authController');
const { list_form_scrap } = require('../api/Scrap/listScrap');
const { delete_scrap } = require('../api/Scrap/deleteScrap');
const { user_nome } = require('../api/User/nameUser');
const authenticateToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/login', login);
router.post('/list_form_scrap', list_form_scrap);
router.post('/user_nome', user_nome);

router.delete('/delete_scrap/:id', delete_scrap);

router.get('/protected', authenticateToken, (req, res) => {
    res.send('Esta é uma rota protegida');
});

module.exports = router;
