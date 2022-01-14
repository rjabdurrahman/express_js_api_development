const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    if(!req.headers.authorization) return res.send('Authentication Failed');
    const token = req.headers.authorization.split(' ')[1];
    
    jwt.verify(token, 'MY_SECRECT3693', function (err, user) {
        if (err) {
            return res.send('Authentication Failed');
        }
        else {
            // Basic Authoriztion
            if(!user.active) return res.send('Your account is not active.');
            next();
        }
    });
}

module.exports = auth;