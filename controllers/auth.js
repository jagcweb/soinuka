var User = require('../controllers/auth.dao');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const SECRET_KEY = 'secretkey123456';

var controller = {
    eventos_anteriores: function(){
        return res.status(200).send({
            message: 'Soy el controlador para eventos anteriores'
        })
    },


    loginUser(req, res, next){
        const userData = {
            user: req.body.user,
            password: req.body.password
        }

        User.findOne({user:userData.user}, (err, userLogged)=>{
            if (err) return res.status(500).send({message:'Ha habido un error al loguearse'});

            if (!userLogged) {
                return res.status(404).send({message:"Usuario incorrecto"});
            } else {

                if(userData.password == userLogged.password){
                    const expiresIn = 24*60*60;
                    const accessToken = jwt.sign({id: userLogged.id}, SECRET_KEY, {expiresIn: expiresIn});

                    const dataUser = {
                        user: userLogged.user,
                        expiresIn: expiresIn,
                        accessToken: accessToken
                    }

                    res.send({dataUser});
                } else {
                    res.status(404).send({message:"Contraseña incorrecta"});
                }
            }

            })
    }



}


module.exports = controller;