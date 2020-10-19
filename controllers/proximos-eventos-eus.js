var ProximosEventosEus = require('../models/proximos-eventos-eus');
var fs = require('fs');
var path = require('path')

var controller = {
    proximos_eventos_eus: function(){
        return res.status(200).send({
            message: 'Soy el controlador para crear proximos eventos'
        })
    },



    guardarProximoEventoEus: function(req, res){
        var proximos_eventos_eus = new ProximosEventosEus();

        var params = req.body;
        proximos_eventos_eus.titulo= params.titulo;
        proximos_eventos_eus.imagen = null;
        proximos_eventos_eus.descripcion = params.descripcion;
        proximos_eventos_eus.anio = params.anio;

        proximos_eventos_eus.save((err, ProximosEventosStored)=>{
            if(err) return res.status(500).send({message:"Error al crear un nuevo proximo evento"});

            if(!ProximosEventosStored) return res.status(404).send({message:'No ha sido posible crear un proximo evento'})

            return res.status(200).send({proximos_eventos_eus: ProximosEventosStored});
        })
    },

    getProximosEventosEus: function(req,res){
        ProximosEventosEus.find({}).sort('-anio').exec((err, proximos_eventos_eus)=>{
            if(err) return res.status(500).send({message:'Error al mostrar los proximos eventos'});

            if(!proximos_eventos_eus) return res.status(404).send({message:'No existen proximos eventos para mostrar'});

            return res.status(200).send({
                proximos_eventos_eus
            });
        })
    },

    deleteProximosEventosEus: function(req, res){
        var proximosEventosId = req.params.id;

        ProximosEventosEus.findByIdAndDelete(proximosEventosId, (err, proximosEventosDeleted)=>{

            if (err) return res.status(500).send({message:"Error al borrar"});

            if (!proximosEventosDeleted) return res.status(404).send({message:"No existe el proximo evento que quieres borrar"});

            return res.status(200).send({
                evento: proximosEventosDeleted
            })
        });

    }, 


    subirImagenEus: function (req, res) {
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
            ProximosEventosEus.findByIdAndUpdate(imagenId, { imagen: nombreArchivo }, { new: true }, (err, eventoUpdated) => {
                if (err) return res.status(500).send({ message: 'Error' });
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

    getImagenEus: function(req, res){
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