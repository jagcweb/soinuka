var express = require('express');
var SliderController = require('../controllers/slider');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'})

router.get('/get-slider', SliderController.getSlider);
router.post('/slider', SliderController.guardarImagenSlider);
router.put('/update-slider/:id',  SliderController.updateImageSlider);
router.delete('/delete-image-slider/:id',  SliderController.deleteImageSlider);
router.post('/upload-image-slider/:id', multipartMiddleware, SliderController.subirImagen);
router.get('/get-image-slider/:imagen', SliderController.getImagen);

module.exports = router;