
const express = require('express');
//importa o método "generateImage" 
const { generateImage } = require('../controllers/openaiController');

// cria uma instância do roteador do Express
const router = express.Router();
// define uma rota POST para "/generateimage"
router.post('/generateimage', generateImage);

module.exports = router;
