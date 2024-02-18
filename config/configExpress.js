const express = require('express');

function configExpress(app) {

    app.use(express.static('static'));
    app.use(express.urlencoded({ extended: false}));

    return app;
}

module.exports = configExpress;