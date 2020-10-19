var express = require('express');
var ContactController = require('../controllers/contacto');
var router = express.Router();

router.post('/contact', ContactController.guardarFormulario);
router.get('/get-contact', ContactController.getFormularios);
router.delete('/delete-contact/:id', ContactController.deleteFormulario);


module.exports = router;