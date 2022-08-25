const path = require('path');
const util = require('util');
const e = require("express");

function getRoot(req, res) {
}

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        let user = req.user;
        console.log("user logueado");
        res.render("login-ok", {
            usuario: user.username,
            nombre: user.firstName,
            apellido: user.lastName,
            email: user.email,
        });
    } else {
        console.log("user NO logueado");
        res.sendFile(__dirname + "/views/login.html");
    }
}

function getSignup(req, res) {
    res.sendFile(__dirname + "/views/signup.html");
}

function postLogin(req, res) {
    let user = req.user;

    res.sendFile(__dirname + "/views/index.html");
}

function postSignup(req, res) {
    let user = req.user;

    res.sendFile(__dirname + "/views/index.html");
}

function getFaillogin(req, res) {
    console.log("error en login");
    res.render("login-error", {});
}

function getFailsignup(req, res) {
    console.log("error en signup");
    res.render("signup-error", {});
}

function getLogout(req, res, next) {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.sendFile(__dirname + "/views/index.html");
    });
}

function failRoute(req, res) {
    res.status(404).render("routing-error", {});
}

function getInfo(req, res) {
    res.json({
        'Argumentos de entrada': process.argv,
        'Sistema operativo': process.platform,
        'Version NodeJs': process.version,
        'Memoria total reservada': util.inspect(process.memoryUsage(), {
            showHidden: false,
            depth: null,
            colors: true
        }),
        'Path ejecucion': process.execPath,
        'Process Id': process.pid,
        'Carpeta proyecto': process.cwd()
    })
}

function generateRandomInteger(cantidad) {
    const randoms = [];
    for (let i = 1; i <= cantidad; i++) {
        randoms.push(Math.floor(Math.random() * cantidad) + 1);
    }
    return randoms;
}

function generateRandomObject(cantidad) {
    const randomsObject = {};
    for (let element of generateRandomInteger(cantidad)) {
        if(randomsObject[element]){
            randomsObject[element] += 1;
        } else {
            randomsObject[element] = 1;
        }
    }
    return randomsObject;
}

function getRandoms(req, res) {
    const totalRandom = req.query.random ? Number(req.query.random) : 100000000
    res.json(generateRandomObject(totalRandom));
}

module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailsignup,
    getRandoms,
    getInfo
};
