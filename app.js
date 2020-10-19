'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();


//Archivos de rutas:
var slider_route = require('./routes/slider');
var contact_route = require('./routes/contacto');
var previous_events_route = require('./routes/eventos-anteriores');
var next_events_route = require('./routes/proximos-eventos');
var auth_route = require('./routes/auth');
var previous_events_eus_route = require('./routes/eventos-anteriores-eus');
var next_events_eus_route = require('./routes/proximos-eventos-eus');

//Middlewares:

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//RUTAS
app.use('/', express.static('client', {redirect: false})); //carga el frontend 
app.use('/api', slider_route);
app.use('/api', contact_route);
app.use('/api', previous_events_route);
app.use('/api', next_events_route);
app.use('/api', auth_route);
app.use('/api', previous_events_eus_route);
app.use('/api', next_events_eus_route);

app.get('*', function(req, res, next){
    res.sendFile(path.resolve('client/index.html'));
});

//Exportar

module.exports = app;
