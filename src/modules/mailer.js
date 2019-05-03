const nodemailer = require('nodemailer');

const path = require('path');

const hbs = require('nodemailer-express-handlebars');//versão antiga

const exphbs = require('express-handlebars');//versão nova

const { host, port, user, pass } = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass },
});


/**
 * versão antiga do hbs
 * 
const viewPath = path.resolve(__dirname, "..", "resources/mail/auth/"); 

console.log(path.resolve(viewPath));

transport.use( "compile", hbs({ 
    viewEngine: hbs.create({ partialsDir: path.resolve(viewPath, "auth") }), 
    viewPath, 
    extName: ".html" }) );



const viewPath = path.resolve('./src/resources/mail/'); 

console.log(path.resolve(viewPath));

transport.use( "compile", hbs({ 
    viewEngine:  hbs.create({ partialsDir: path.resolve(viewPath, "auth/") }), 
    viewPath, 
    extName: ".html" 
}));
transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
}));


 */

const viewPath = path.resolve('./src/resources/mail/'); 

transport.use('compile', hbs({ 
    viewEngine: exphbs.create({ partialsDir: path.resolve('./src/resources/mail/partials') }), 
    viewPath, 
    extName: '.html' }));

module.exports = transport;