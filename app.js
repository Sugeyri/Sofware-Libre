const express = require('express');
const app = express();
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://127.0.0.1:27017/app2');
const User = require('./models/user');
const Rol = require('./models/rol');
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// get users
app.get('/api/users', (req, res) => {
    User.find(function(err, users){
        if(err) {
            res.send(err);
        }
        res.json(users);
    });
});

//create user
app.post('/api/users', (req, res) => {
    var user = new User();
    
    user.name = req.body.name;
    user.lastname = req.body.lastname;
    user.username = req.body.username;
    user.password = req.body.password;

    user.save(function(err){
        if(err) {
            res.send(err);
        }
        res.status(201);
        res.json(user);
    });
});

// get roles
app.get('/api/roles', (req, res) => {
    Rol.find(function(err, roles){
        if(err) {
            res.send(err);
        }
        res.json(roles);
    });
});

//create rol
app.post('/api/roles', (req, res) => {
    var rol = new Rol();
    
    rol.name = req.body.name;
    rol.description = req.body.description;

    rol.save(function(err){
        if(err) {
            res.send(err);
        }
        res.status(201);
        res.json(rol);
    });
});

// handle 404
app.use(function(req, res, next){
    res.status(404);
    res.send({ error: 'Not found' });
    return;
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));