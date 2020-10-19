var Slider = require('../models/slider');
var fs = require('fs');
var path = require('path')

var controller = {
    slider: function () {
        return res.status(200).send({
            message: 'Soy el controlador del Slider'
        })
    },


    guardarImagenSlider: function(req, res){
        var slider = new Slider();

        var params = req.body;
        slider.imagen = null;

        slider.save((err, sliderImageStored)=>{
            if(err) return res.status(500).send({message:"Error al crear una nueva imagen"});

            if(!sliderImageStored) return res.status(404).send({message:'No ha sido posible crear una nueva imagen'})

            return res.status(200).send({slider: sliderImageStored});
        })
    },


    subirImagen: function (req, res) {
        var imagenId = req.params.id;
        var nombreArchivo = 'Imagen no subida';

        if (req.files) {
        var filePath = req.files.imagen.path;
        console.log(filePath)
        var fileSplit = filePath.split('/');
        var nombreArchivo = fileSplit[1];
        var extSplit = nombreArchivo.split('\.');
        var fileExt = extSplit[1];

        if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg') {
            Slider.findByIdAndUpdate(imagenId, { imagen: nombreArchivo }, { new: true }, (err, sliderUpdated) => {
                if (err) return res.status(500).send({ message: 'Error al actualizar el slider' });
                if (!sliderUpdated) return res.status(404).send({ message: 'El nombre de la imagen a actualizar no existe.' })
                return res.status(200).send({
                    slider: sliderUpdated
                })
            });
        } else {
            fs.unlink(filePath, (err)=>{
                return res.status(200).send({message: 'El archivo introducido no era una imagen' })
            });
        } 
        } else {
            return res.status(200).send({
                message: nombreArchivo
            })
        }
    },


    getImagen: function(req, res){
        var archivo = req.params.imagen;
        var path_archivo = './uploads/'+archivo;

        fs.exists(path_archivo, (exists)=>{
            if(exists){
                return res.sendFile(path.resolve(path_archivo));
            }else{
                return res.status(200).send({
                    message: "no existe la imagen..."
                })
            }
        })
    },




    getSlider: function (req, res) {
        Slider.find({}).exec((err, slider) => {
            if (err) return res.status(500).send({ message: 'Error al mostrar las imagenes del slider' });

            if (!slider) return res.status(404).send({ message: 'No existen imagenes para mostrar' });

            return res.status(200).send({
                slider: slider
            });
        })

    },


    deleteImageSlider: function(req, res){
        var sliderImageId = req.params.id;

        Slider.findByIdAndDelete(sliderImageId, (err, sliderImageDeleted)=>{

            if (err) return res.status(500).send({message:"Error al borrar"});

            if (!sliderImageDeleted) return res.status(404).send({message:"No existe la imagen del slider que quieres borrar"});

            return res.status(200).send({
                slider: sliderImageDeleted
            })
        });

    }, 


    updateImageSlider: function (req, res) {
        var actualizar = req.body;
        var imagenId = req.params.id;
        Slider.findByIdAndUpdate(imagenId, actualizar, { new: true }, (err, sliderUpdated) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar el slider' });
            if (!sliderUpdated) return res.status(404).send({ message: 'El nombre de la imagen a actualizar no existe.' })
            return res.status(200).send({
                slider: sliderUpdated
            })
        })
    }



}




module.exports = controller;