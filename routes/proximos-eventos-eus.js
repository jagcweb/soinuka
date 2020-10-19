var express = require('express');
var NextEventsEusController = require('../controllers/proximos-eventos-eus');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'})


router.post('/next-events-eus', NextEventsEusController.guardarProximoEventoEus);
router.get('/get-next-events-eus', NextEventsEusController.getProximosEventosEus);
router.delete('/delete-next-events-eus/:id', NextEventsEusController.deleteProximosEventosEus);
router.post('/upload-image-next-events-eus/:id', multipartMiddleware, NextEventsEusController.subirImagenEus);
router.get('/get-image-next-events/:imagen', NextEventsEusController.getImagenEus);


module.exports = router;
