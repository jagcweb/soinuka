var express = require('express');
var PreviousEventsEusController = require('../controllers/eventos-anteriores-eus');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'})

router.post('/previous-events-eus', PreviousEventsEusController.guardarEventoAnteriorEus);
router.get('/get-previous-events-eus', PreviousEventsEusController.getEventosAnterioresEus);
router.delete('/delete-previous-events-eus/:id', PreviousEventsEusController.deleteEventosAnterioresEus);
router.post('/upload-image-previous-events-eus/:id', multipartMiddleware, PreviousEventsEusController.subirImagenEus);
router.get('/get-image-previous-events/:imagen', PreviousEventsEusController.getImagenEus);


module.exports = router;