const handlebars = require('express-handlebars');

function configHandlebars(app) {

    app.engine('hbs', handlebars.engine({
        extname: 'hbs',
    }));
    app.set('view engine', 'hbs');

    return app;
};

module.exports = configHandlebars;