const express = require('express');
const { handleCep } = require('../controllers/cepController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

/**
 * POST /cep
 * Body: { "cep": "01001000" }
 * Header: Authorization: Bearer <token>
 */
router.post('/', authMiddleware, handleCep);

module.exports = router;
