var express = require('express');
var NextEventsController = require('../controllers/proximos-eventos');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'})


router.post('/next-events', NextEventsController.guardarProximoEvento);
router.get('/get-next-events', NextEventsController.getProximosEventos);
router.delete('/delete-next-events/:id', NextEventsController.deleteProximosEventos);
router.post('/upload-image-next-events/:id', multipartMiddleware, NextEventsController.subirImagen);
router.get('/get-image-next-events/:imagen', NextEventsController.getImagen);

module.exports = router;