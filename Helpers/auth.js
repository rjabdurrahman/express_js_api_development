const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, 'MY_SECRECT3693', function (err, user) {
        if (err) {
            res.send('Authentication Failed');
        }
        else {
            if(user.type === 'admin') next();
            else res.send('You are not the admin');
        }
    });
}

module.exports = auth;