var EventosAnteriores = require('../models/eventos-anteriores');
var fs = require('fs');
var path = require('path')

var controller = {
    eventos_anteriores: function(){
        return res.status(200).send({
            message: 'Soy el controlador para eventos anteriores'
        })
    },






    guardarEventoAnterior: function(req, res){
        var eventos_anteriores = new EventosAnteriores();

        var params = req.body;
        eventos_anteriores.titulo= params.titulo;
        eventos_anteriores.imagen = null;
        eventos_anteriores.descripcion = params.descripcion;
        eventos_anteriores.anio = params.anio;

        eventos_anteriores.save((err, eventosAnterioresStored)=>{
            if(err) return res.status(500).send({message:"Error al crear un nuevo evento anterior"});

            if(!eventosAnterioresStored) return res.status(404).send({message:'No ha sido posible crear un evento anterior'})

            return res.status(200).send({eventos_anteriores: eventosAnterioresStored});
        })
    },

    getEventosAnteriores: function(req,res){
        EventosAnteriores.find({}).sort('-anio').exec((err, eventosanteriores)=>{
            if(err) return res.status(500).send({message:'Error al mostrar los eventos anteriores'});

            if(!eventosanteriores) return res.status(404).send({message:'No existen eventos anteriores para mostrar'});

            return res.status(200).send({
                eventosanteriores
            });
        })
    },


    deleteEventosAnteriores: function(req, res){
        var eventosAnterioresId = req.params.id;

        EventosAnteriores.findByIdAndDelete(eventosAnterioresId, (err, eventosAnterioresDeleted)=>{

            if (err) return res.status(500).send({message:"Error al borrar"});

            if (!eventosAnterioresDeleted) return res.status(404).send({message:"No existe el evento anterior que quieres borrar"});

            return res.status(200).send({
                evento: eventosAnterioresDeleted
            })
        });

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
            EventosAnteriores.findByIdAndUpdate(imagenId, { imagen: nombreArchivo }, { new: true }, (err, eventoUpdated) => {
                if (err) return res.status(500).send({ message: 'Error al actualizar el slider' });
                if (!eventoUpdated) return res.status(404).send({ message: 'El nombre de la imagen a actualizar no existe.' })
                return res.status(200).send({
                    evento: eventoUpdated
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
}


module.exports = controller;