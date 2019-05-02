const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {

    const autheHeader = req.headers.authorization;

    if(!autheHeader) {
        return res.status(401).send({error:'No Token provided'});
    }

    const parts = autheHeader.split(' ');

    if(!parts.length === 2) {
        return res.status(401).send({error:'Token error'});
    }

    const [ scheme, token ] = parts;

    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({error:'Token malformatted'});
    }    

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) {
            return res.status(401).send({error:'Token invalid'}); 
        }

        req.userId = decoded.id;

        return next();
    });



};