var express = require('express');
var PreviousEventsController = require('../controllers/eventos-anteriores');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'})


router.post('/previous-events', PreviousEventsController.guardarEventoAnterior);
router.get('/get-previous-events', PreviousEventsController.getEventosAnteriores);
router.delete('/delete-previous-events/:id', PreviousEventsController.deleteEventosAnteriores);
router.post('/upload-image-previous-events/:id', multipartMiddleware, PreviousEventsController.subirImagen);
router.get('/get-image-previous-events/:imagen', PreviousEventsController.getImagen);


module.exports = router;