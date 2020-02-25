"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Moto = /** @class */ (function () {
    function Moto(id, model, price, rating, shortDescription, description, type, image) {
        this.id = id;
        this.model = model;
        this.price = price;
        this.rating = rating;
        this.shortDescription = shortDescription;
        this.description = description;
        this.type = type;
        this.image = image;
    }
    return Moto;
}());
var motos = [
    new Moto(0, "Moto1", 24.99, 4.3, "This is a short description of the First Moto", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ["A", "Sport"], "http://placehold.it/820x320"),
    new Moto(1, "Moto2", 64.99, 3.5, "This is a short description of the Second Moto", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ["A2", "Naked"], "http://placehold.it/820x320"),
    new Moto(2, "Moto3", 74.99, 4.2, "This is a short description of the Third Moto", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ["A2", "Street"], "http://placehold.it/820x320"),
    new Moto(3, "Moto4", 84.99, 3.9, "This is a short description of the Fourth Moto", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ["A", "Sport"], "http://placehold.it/820x320"),
    new Moto(4, "Moto5", 94.99, 5, "This is a short description of the Fourth Moto", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ["A2", "Custom"], "http://placehold.it/820x320"),
    new Moto(5, "Moto6", 54.99, 4.6, "This is a short description of the Fourth Moto", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", ["A2", "Sport"], "http://placehold.it/820x320")
];
function getMotos() {
    return motos;
}
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "127.0.0.1:8101"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/motos', bodyParser.json(), function (req, res) {
    var pNew = new Moto(motos.length + 1, req.body.model, req.body.price, req.body.rating, req.body.shortDescription, req.body.description, req.body.type, req.body.image);
    motos.push(pNew);
    res.status(200).send({
        id: pNew.id,
        model: pNew.model,
        price: pNew.price,
        rating: pNew.rating,
        shortDescription: pNew.shortDescription,
        description: pNew.description,
        type: pNew.type,
        image: pNew.image
    });
});
app.get('/', function (req, res) {
    res.send('The URL of motos is http://127.0.0.1:8101/motos');
});
app.get('/motos', function (req, res) {
    var tmp = getMotos();
    console.log("new request" + tmp);
    res.json(tmp);
});
function getMotosById(motoId) {
    var p;
    p = motos.find(function (p) { return p.id == motoId; });
    return p;
}
app.get('/motos/:id', function (req, res) {
    res.json(getMotosById(parseInt(req.params.id)));
});
function updateMotosById(req, motoId) {
    var p;
    p = motos.find(function (p) { return p.id == motoId; });
    var index = motos.indexOf(p);
    p.model = req.body.model,
        p.price = req.body.price,
        p.rating = req.body.rating,
        p.shortDescription = req.body.shortDescription,
        p.description = req.body.description,
        p.type = req.body.type,
        p.image = req.body.image;
    motos[index] = p;
    return p;
}
app.put('/motos/:id', function (req, res) {
    res.json(updateMotosById(req, parseInt(req.params.id)));
    res.send('Got a UPDATE request at /user');
});
function deleteMotosById(motoId) {
    var p;
    p = motos.find(function (p) { return p.id == motoId; });
    var index = motos.indexOf(p);
    motos.splice(index, 1);
    //delete motos[index];
    return p;
}
app.delete('/motos/:id', function (req, res) {
    res.json(deleteMotosById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
});
var server = app.listen(8100, "127.0.0.1", function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log('Listening on %s %s', address, port);
});
