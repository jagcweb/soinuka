var mongoose = require('mongoose');
var app = require('./app');
var port = 3700;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/soinuka')
                .then(()=>{
                    console.log("Conexion a la BBDD establecida");
                    app.listen(port,()=>{
                        console.log("Servidor corriendo correctamente en la URL: localhost:"+port);
                    })
                })
                .catch(error=>{
                    console.log(error)
                });