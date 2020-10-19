var Contactos = require('../models/contacto');

var controller = {
    listar_contactos: function(){
        return res.status(200).send({
            message: 'Soy el controlador para listar Contactos'
        })
    },


    guardarFormulario: function(req, res){
        var form_contacto = new Contactos();

        var params = req.body;
        form_contacto.nombre = params.nombre;
        form_contacto.email = params.email;
        form_contacto.telefono = params.telefono;
        form_contacto.mensaje = params.mensaje;
        

        form_contacto.save((err, formContactoStored)=>{
            if(err) return res.status(500).send({message:"Error al enviar el formulario"});

            if(!formContactoStored) return res.status(404).send({message:'No ha sido posible enviar el formulario'})

            return res.status(200).send({form_contacto: formContactoStored});
        })
    },

    getFormularios: function(req,res){
        Contactos.find({}).exec((err, form_contacto)=>{
            if(err) return res.status(500).send({message:'Error al mostrar los formularios'});

            if(!form_contacto) return res.status(404).send({message:'No existen formularios para mostrar'});

            return res.status(200).send({
                form_contacto
            });
        })
    },

    deleteFormulario: function(req, res){
        var contactoId = req.params.id;

        Contactos.findByIdAndDelete(contactoId, (err, ContactoDeleted)=>{

            if (err) return res.status(500).send({message:"Error al borrar"});

            if (!ContactoDeleted) return res.status(404).send({message:"No existe el contacto que quieres borrar"});

            return res.status(200).send({
                contacto: ContactoDeleted
            })
        });

    }, 

}

module.exports = controller;